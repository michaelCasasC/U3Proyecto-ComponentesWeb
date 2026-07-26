const app = require('./app')
const db = require('./database/conexion')
const { port } = require('./config/env')

db.query('SELECT 1')
  .then(() => app.listen(port, () => console.log(`MediCitas API ejecutándose en el puerto ${port}`)))
  .catch(error => {
    console.error('No se pudo inicializar PostgreSQL:', error)
    process.exit(1)
  })
