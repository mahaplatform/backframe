const Bookshelf = require('bookshelf')
const knex = require('./knex')

const bookshelf = Bookshelf(knex)

bookshelf.plugin('virtuals')

module.exports = bookshelf
