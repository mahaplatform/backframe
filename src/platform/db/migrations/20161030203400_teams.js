exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('teams', function (table) {
      table.increments('id').primary()
      table.string('title')
      table.string('subdomain')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('teams')
  ])
}
