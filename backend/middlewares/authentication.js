const jwt = require('jsonwebtoken')
const env = require('../config/env')

module.exports = function authentication(req, res, next) {
  const [tipo, token] = (req.headers.authorization || '').split(' ')
  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ mensaje: 'Debe enviar un token válido.' })
  }

  try {
    req.usuario = jwt.verify(token, env.jwtSecret)
    next()
  } catch {
    return res.status(401).json({ mensaje: 'Token expirado o inválido.' })
  }
}
