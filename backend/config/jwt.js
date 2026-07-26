const jwt = require('jsonwebtoken')
const env = require('./env')

function generarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, nombre: usuario.name, rol: usuario.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  )
}

module.exports = generarToken
