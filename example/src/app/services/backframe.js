import backframe from 'backframe'
import knex from './knex'
import bookshelf from './bookshelf'

export const { handler, route, resources, router, segment, table } = backframe({
    bookshelf,
    knex,
    redis: {},
    plugins: []
})
