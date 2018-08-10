import Knex from 'knex'

const knex = new Knex({
  client: 'postgresql',
  connection: 'postgres://postgres@localhost:5432/maha',
  useNullAsDefault: true,
  pool: {
    min: 5,
    max: 30
  }
})

export default knex
