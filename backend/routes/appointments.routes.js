const express = require('express')
const db = require('../database/conexion')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const { appointmentSelect } = require('../utils/mappers')

const router = express.Router()
const validStatuses = ['Pendiente', 'Confirmada', 'Cancelada', 'Finalizada']
const wrap = handler => async (req, res, next) => { try { await handler(req, res) } catch (error) { next(error) } }
router.use(authentication)

router.get('/', wrap(async (req, res) => {
  const admin = req.usuario.rol === 'admin'
  const query = `${appointmentSelect}${admin ? '' : ' WHERE a.patient_id=$1'} ORDER BY a.date DESC,a.time DESC`
  const { rows } = await db.query(query, admin ? [] : [req.usuario.id])
  res.json(rows)
}))

router.post('/', wrap(async (req, res) => {
  const { doctorId, date, time } = req.body
  if (!doctorId || !/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !/^\d{2}:\d{2}$/.test(time || '')) return res.status(400).json({ mensaje: 'Médico, fecha y hora son obligatorios.' })
  const doctor = (await db.query('SELECT id,available FROM doctors WHERE id=$1', [doctorId])).rows[0]
  if (!doctor) return res.status(404).json({ mensaje: 'Médico no encontrado.' })
  if (!doctor.available) return res.status(409).json({ mensaje: 'El médico seleccionado no está disponible.' })
  try {
    const created = await db.query("INSERT INTO appointments (patient_id,doctor_id,date,time,status) VALUES ($1,$2,$3,$4,'Pendiente') RETURNING id", [req.usuario.id, doctorId, date, time])
    res.status(201).json((await db.query(`${appointmentSelect} WHERE a.id=$1`, [created.rows[0].id])).rows[0])
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ mensaje: 'Ese horario ya está reservado.' })
    throw error
  }
}))

router.patch('/:id/status', wrap(async (req, res) => {
  const { status } = req.body
  if (!validStatuses.includes(status)) return res.status(400).json({ mensaje: 'Estado inválido.' })
  const appointment = (await db.query('SELECT * FROM appointments WHERE id=$1', [req.params.id])).rows[0]
  if (!appointment) return res.status(404).json({ mensaje: 'Cita no encontrada.' })
  const isOwner = appointment.patient_id === req.usuario.id
  if (req.usuario.rol !== 'admin' && (!isOwner || status !== 'Cancelada')) return res.status(403).json({ mensaje: 'No tiene permisos para cambiar este estado.' })
  await db.query('UPDATE appointments SET status=$1 WHERE id=$2', [status, req.params.id])
  res.json((await db.query(`${appointmentSelect} WHERE a.id=$1`, [req.params.id])).rows[0])
}))

router.delete('/:id', authorization('admin'), wrap(async (req, res) => {
  const result = await db.query('DELETE FROM appointments WHERE id=$1', [req.params.id])
  if (!result.rowCount) return res.status(404).json({ mensaje: 'Cita no encontrada.' })
  res.json({ mensaje: 'Cita eliminada correctamente.' })
}))

module.exports = router
