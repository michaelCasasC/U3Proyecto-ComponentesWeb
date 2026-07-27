const express = require('express')
const db = require('../database/conexion')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const { doctorSelect, normalizeDoctor } = require('../utils/mappers')

const router = express.Router()
const admin = [authentication, authorization('admin')]
const wrap = handler => async (req, res, next) => { try { await handler(req, res) } catch (error) { next(error) } }

router.get('/specialties', wrap(async (_req, res) => {
  const { rows } = await db.query(`SELECT s.id,s.name,s.icon,s.description,s.color,COUNT(d.id)::int AS "doctorsCount" FROM specialties s LEFT JOIN doctors d ON d.specialty_id=s.id GROUP BY s.id ORDER BY s.id`)
  res.json(rows)
}))

router.post('/specialties', ...admin, wrap(async (req, res) => {
  const { name, icon = 'LocalHospital', description = '', color = '#1976d2' } = req.body
  if (!name?.trim()) return res.status(400).json({ mensaje: 'El nombre es obligatorio.' })
  try {
    const { rows } = await db.query('INSERT INTO specialties (name,icon,description,color) VALUES ($1,$2,$3,$4) RETURNING *,0 AS "doctorsCount"', [name.trim(), icon, description, color])
    res.status(201).json(rows[0])
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ mensaje: 'La especialidad ya existe.' })
    throw error
  }
}))

router.put('/specialties/:id', ...admin, wrap(async (req, res) => {
  const current = (await db.query('SELECT * FROM specialties WHERE id=$1', [req.params.id])).rows[0]
  if (!current) return res.status(404).json({ mensaje: 'Especialidad no encontrada.' })
  const value = { ...current, ...req.body }
  const { rows } = await db.query(`UPDATE specialties SET name=$1,icon=$2,description=$3,color=$4 WHERE id=$5 RETURNING *, (SELECT COUNT(*)::int FROM doctors WHERE specialty_id=$5) AS "doctorsCount"`, [value.name, value.icon, value.description, value.color, req.params.id])
  res.json(rows[0])
}))

router.delete('/specialties/:id', ...admin, wrap(async (req, res) => {
  try {
    const result = await db.query('DELETE FROM specialties WHERE id=$1', [req.params.id])
    if (!result.rowCount) return res.status(404).json({ mensaje: 'Especialidad no encontrada.' })
    res.json({ mensaje: 'Especialidad eliminada correctamente.' })
  } catch (error) {
    if (error.code === '23503') return res.status(409).json({ mensaje: 'No se puede eliminar una especialidad que tiene médicos.' })
    throw error
  }
}))

router.get('/doctors', wrap(async (req, res) => {
  const params = []
  let query = doctorSelect
  if (req.query.specialtyId) { query += ' WHERE d.specialty_id = $1'; params.push(req.query.specialtyId) }
  const { rows } = await db.query(`${query} ORDER BY d.id`, params)
  res.json(rows.map(normalizeDoctor))
}))

router.get('/doctors/:id', wrap(async (req, res) => {
  const row = (await db.query(`${doctorSelect} WHERE d.id=$1`, [req.params.id])).rows[0]
  if (!row) return res.status(404).json({ mensaje: 'Médico no encontrado.' })
  res.json(normalizeDoctor(row))
}))

router.post('/doctors', ...admin, wrap(async (req, res) => {
  const { name, specialtyId, rating = 0, experience = 0, photo = '', schedule = '', available = true } = req.body
  if (!name?.trim() || !specialtyId) return res.status(400).json({ mensaje: 'Nombre y especialidad son obligatorios.' })
  try {
    const created = await db.query('INSERT INTO doctors (name,specialty_id,rating,experience,photo,schedule,available) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id', [name.trim(), specialtyId, rating, experience, photo, schedule, available])
    const row = (await db.query(`${doctorSelect} WHERE d.id=$1`, [created.rows[0].id])).rows[0]
    res.status(201).json(normalizeDoctor(row))
  } catch (error) {
    if (error.code === '23503') return res.status(400).json({ mensaje: 'La especialidad indicada no existe.' })
    throw error
  }
}))

router.put('/doctors/:id', ...admin, wrap(async (req, res) => {
  const current = (await db.query('SELECT * FROM doctors WHERE id=$1', [req.params.id])).rows[0]
  if (!current) return res.status(404).json({ mensaje: 'Médico no encontrado.' })
  const value = { ...current, ...req.body }
  const specialtyId = req.body.specialtyId ?? current.specialty_id
  await db.query('UPDATE doctors SET name=$1,specialty_id=$2,rating=$3,experience=$4,photo=$5,schedule=$6,available=$7 WHERE id=$8', [value.name, specialtyId, value.rating, value.experience, value.photo, value.schedule, value.available, req.params.id])
  res.json(normalizeDoctor((await db.query(`${doctorSelect} WHERE d.id=$1`, [req.params.id])).rows[0]))
}))

router.delete('/doctors/:id', ...admin, wrap(async (req, res) => {
  try {
    const result = await db.query('DELETE FROM doctors WHERE id=$1', [req.params.id])
    if (!result.rowCount) return res.status(404).json({ mensaje: 'Médico no encontrado.' })
    res.json({ mensaje: 'Médico eliminado correctamente.' })
  } catch (error) {
    if (error.code === '23503') return res.status(409).json({ mensaje: 'No se puede eliminar un médico que tiene citas.' })
    throw error
  }
}))

module.exports = router
