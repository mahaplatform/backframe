import backframe from 'backframe'
import knex from './knex'
import redis from './redis'

export const { handler, queue, route, resources, router, segment, table, worker } = backframe({
    knex,
    redis: {},
    plugins: []
})
