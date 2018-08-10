import Knex from 'knex'

const knex = new Knex({
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  useNullAsDefault: true,
  pool: {
    min: 5,
    max: 30
  }
})

export default knex
