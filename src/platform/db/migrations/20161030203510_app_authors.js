exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('app_authors', function (table) {
      table.increments('id').primary()
      table.string('name')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('app_authors')
  ])
}
