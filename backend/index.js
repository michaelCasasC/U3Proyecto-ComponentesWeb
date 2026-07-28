const app = require('./app')
const db = require('./database/conexion')
const env = require('./config/env')

function startServer() {
  db.query('SELECT 1')
    .then(() => app.listen(env.port, () => console.log(`MediCitas API ejecutándose en el puerto ${env.port}`)))
    .catch(error => {
      console.error('No se pudo inicializar PostgreSQL:', error)
      process.exit(1)
    })
}

if (process.env.NODE_ENV !== 'production' && process.env.VERCEL_ENV !== 'false') {
  startServer()
}

module.exports = app
