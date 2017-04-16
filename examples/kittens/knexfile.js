module.exports = {
  migrations: {
    tableName: 'schema_migrations',
    directory: './src/db/migrations'
  },
  seeds: {
    directory: './src/db'
  },
  client: 'sqlite3',
  connection: { filename: 'data.sqlite3' },
  pool: {
    min: 1,
    max: 1
  }
}
