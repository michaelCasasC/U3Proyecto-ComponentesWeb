require('dotenv').config()
const express = require('express')
const cors = require('cors')
const env = require('./config/env')

const app = express()
app.use(cors({ origin: env.frontendUrls, credentials: false }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'medicitas-api' }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api', require('./routes/catalog.routes'))
app.use('/api/appointments', require('./routes/appointments.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/push', require('./routes/push.routes'))

app.use((_req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada.' }))
app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ mensaje: 'Error interno del servidor.' })
})

module.exports = app
