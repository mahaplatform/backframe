var dotenv = require('dotenv')
dotenv.load()

const defaults = {
  migrations: {
    tableName: 'schema_migrations',
    directory: '/'
  },
  seeds: {
    directory: '/'
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
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    pool: {
      min: 1,
      max: 1
    },
    useNullAsDefault: true
  }),
  production: defaults
}
