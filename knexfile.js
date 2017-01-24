var dotenv = require('dotenv')
dotenv.load()

const defaults = {
  migrations: {
    tableName: 'schema_migrations',
    directory: './platform/db/migrations'
  },
  seeds: {
    directory: './platform/db'
  },
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  }
}

module.exports = {
  development: defaults,
  test: Object.assign({}, defaults, {
    connection: process.env.TEST_DATABASE_URL,
    pool: {
      min: 1,
      max: 1
    }
  }),
  production: defaults
}
