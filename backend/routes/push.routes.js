const express = require('express')
const webpush = require('web-push')
const db = require('../database/conexion')
const { authenticate } = require('../middlewares/authentication')

const router = express.Router()

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY
const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:admin@medicitas.app'

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey)
}

router.post('/subscribe', authenticate, async (req, res, next) => {
  try {
    const { endpoint, keys } = req.body
    if (!endpoint || !keys) return res.status(400).json({ mensaje: 'Falta endpoint o keys.' })

    await db.query(
      `INSERT INTO push_subscriptions (user_id, endpoint, p256dh, auth)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (endpoint) DO UPDATE SET p256dh = EXCLUDED.p256dh, auth = EXCLUDED.auth, updated_at = NOW()`,
      [req.usuario.id, endpoint, keys.p256dh, keys.auth]
    )

    res.json({ mensaje: 'Suscripción registrada.' })
  } catch (error) { next(error) }
})

router.post('/unsubscribe', authenticate, async (req, res, next) => {
  try {
    const { endpoint } = req.body
    await db.query('DELETE FROM push_subscriptions WHERE user_id = $1 AND endpoint = $2', [req.usuario.id, endpoint])
    res.json({ mensaje: 'Suscripción eliminada.' })
  } catch (error) { next(error) }
})

router.post('/send', authenticate, async (req, res, next) => {
  try {
    if (req.usuario.role !== 'admin') return res.status(403).json({ mensaje: 'No autorizado.' })

    const { title, body, url, userId } = req.body
    let query = 'SELECT * FROM push_subscriptions'
    const params = []

    if (userId) {
      query += ' WHERE user_id = $1'
      params.push(userId)
    }

    const { rows: subscriptions } = await db.query(query, params)

    if (!subscriptions.length) return res.status(404).json({ mensaje: 'No hay suscripciones.' })

    const results = await Promise.allSettled(
      subscriptions.map(sub =>
        webpush.sendNotification({
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth }
        }, JSON.stringify({ title, body, url })).catch(async error => {
          if (error.statusCode === 410) {
            await db.query('DELETE FROM push_subscriptions WHERE endpoint = $1', [sub.endpoint])
          }
        })
      )
    )

    const sent = results.filter(r => r.status === 'fulfilled').length
    res.json({ mensaje: `Notificación enviada a ${sent} dispositivo(s).`, total: subscriptions.length, sent })
  } catch (error) { next(error) }
})

module.exports = router
