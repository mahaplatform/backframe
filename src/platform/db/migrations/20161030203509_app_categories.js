exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('app_categories', function (table) {
    table.increments('id').primary()
    table.string('title')
    table.timestamps()
  })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('app_categories')
  ])
}
