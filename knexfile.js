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
    min: 4,
    max: 8
  }
}

module.exports = {
  development: defaults,
  test: Object.assign({}, defaults, {
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    pool: {
      min: 4,
      max: 8
    },
    useNullAsDefault: true
  }),
  production: defaults
}
