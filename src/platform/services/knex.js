const config = require('../../../knexfile.js')
const Knex = require('knex')

module.exports = new Knex(config[process.env.NODE_ENV])
