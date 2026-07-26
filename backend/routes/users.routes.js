const express = require('express')
const db = require('../database/conexion')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const router = express.Router()
const wrap = handler => async (req, res, next) => { try { await handler(req, res) } catch (error) { next(error) } }
router.use(authentication, authorization('admin'))

router.get('/', wrap(async (_req, res) => res.json((await db.query('SELECT id,name,email,role,avatar FROM users ORDER BY id')).rows)))

router.delete('/:id', wrap(async (req, res) => {
  if (Number(req.params.id) === req.usuario.id) return res.status(409).json({ mensaje: 'No puede eliminar su propia cuenta.' })
  try {
    const result = await db.query('DELETE FROM users WHERE id=$1', [req.params.id])
    if (!result.rowCount) return res.status(404).json({ mensaje: 'Usuario no encontrado.' })
    res.json({ mensaje: 'Usuario eliminado correctamente.' })
  } catch (error) {
    if (error.code === '23503') return res.status(409).json({ mensaje: 'No se puede eliminar un usuario que tiene citas.' })
    throw error
  }
}))

module.exports = router
