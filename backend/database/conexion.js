const { Pool } = require('pg')
const env = require('../config/env')

const conexion = new Pool(env.database)

module.exports = conexion
