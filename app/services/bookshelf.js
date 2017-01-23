const Bookshelf = require('bookshelf')
const knex = require('./knex')

module.exports = Bookshelf(knex)
