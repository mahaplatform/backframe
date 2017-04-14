const config = require('../../../knexfile')
const Knex = require('knex')

module.exports = new Knex(config)
