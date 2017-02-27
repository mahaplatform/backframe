exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('rights', function (table) {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('apps.id')
      table.string('text')
      table.string('description')
      table.timestamps()
      table.unique(['app_id', 'text'])
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('rights')
  ])
}
