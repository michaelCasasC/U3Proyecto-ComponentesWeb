const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../database/conexion')
const generarToken = require('../config/jwt')

const router = express.Router()
const publicUser = user => ({ id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar || '' })

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({ mensaje: 'Debe completar todos los campos.' })
    if (password.length < 6) return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres.' })
    if ((await db.query('SELECT id FROM users WHERE LOWER(email)=LOWER($1)', [email.trim()])).rowCount) return res.status(409).json({ mensaje: 'El email ya está registrado.' })

    const passwordHash = await bcrypt.hash(password, 10)
    const { rows } = await db.query(
      "INSERT INTO users (name,email,password,role) VALUES ($1,LOWER($2),$3,'patient') RETURNING id,name,email,role,avatar",
      [name.trim(), email.trim(), passwordHash],
    )
    res.status(201).json({ mensaje: 'Usuario registrado correctamente.', usuario: publicUser(rows[0]) })
  } catch (error) { next(error) }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ mensaje: 'Debe ingresar el correo y la contraseña.' })
    const { rows } = await db.query('SELECT * FROM users WHERE LOWER(email)=LOWER($1)', [email.trim()])
    const user = rows[0]
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ mensaje: 'Credenciales inválidas.' })
    const usuario = publicUser(user)
    res.json({ mensaje: 'Inicio de sesión correcto.', token: generarToken(usuario), usuario })
  } catch (error) { next(error) }
})

module.exports = router
