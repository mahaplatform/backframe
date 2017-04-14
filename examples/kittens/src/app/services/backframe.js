import backframe from 'backframe'
import knex from './knex'

export const { handler, route, resources, router, segment, table } = backframe({
    knex,
    redis: {},
    plugins: []
})
