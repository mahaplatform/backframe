import backframe from 'backframe'
import knex from './knex'

export const { handler, queue, route, resources, router, segment, table, worker } = backframe({
    knex,
    redis: {},
    plugins: []
})
