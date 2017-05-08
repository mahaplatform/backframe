import './environment'
import _ from 'lodash'
import Knex from 'knex'

const [,client,database] = process.env.DATABASE_URL.match(/(.*)\:\/\/\/?(.*)/)

const connection = _.includes(['sqlite3','sqlite'], client) ? database : process.env.DATABASE_URL

module.exports = new Knex({
  client,
  connection,
  pool: {
    min: 3,
    max: 5
  },
  useNullAsDefault: true
})
