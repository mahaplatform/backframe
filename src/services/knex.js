import './environment'
import Knex from 'knex'

const [,client,database] = process.env.DATABASE_URL.match(/(.*)\:\/\/\/(.*)/)

const connection = (client === 'sqlite3') ? database : process.env.DATABASE_URL

module.exports = new Knex({
  client,
  connection,
  pool: {
    min: 3,
    max: 5
  }
})
