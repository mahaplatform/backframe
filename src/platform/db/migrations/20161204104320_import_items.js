exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('import_items', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('import_id').unsigned()
      table.foreign('import_id').references('imports.id')
      table.integer('line')
      table.jsonb('data')
      table.jsonb('errors')
      table.string('status')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('import_items')
  ])
}
