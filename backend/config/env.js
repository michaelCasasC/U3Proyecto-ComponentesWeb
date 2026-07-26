const required = ['PORT', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USER', 'DB_PASSWORD', 'FRONTEND_URL']
const missing = required.filter(name => !process.env[name])

if (missing.length) {
  throw new Error(`Faltan variables de entorno obligatorias: ${missing.join(', ')}`)
}

module.exports = {
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  frontendUrls: process.env.FRONTEND_URL.split(',').map(url => url.trim()),
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
}
