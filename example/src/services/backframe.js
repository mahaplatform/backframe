import backframe from 'backframe'
import knex from './knex'
import redis from './redis'

export default backframe({
  knex,
  redis
})
