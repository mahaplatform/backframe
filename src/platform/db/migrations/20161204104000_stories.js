exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('stories', function (table) {
    table.increments('id').primary()
    table.string('text')
    table.timestamps()
  })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('stories')
  ])
}
