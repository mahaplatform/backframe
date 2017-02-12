exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('strategies', function (table) {
    table.increments('id').primary()
    table.integer('team_id').unsigned()
    table.foreign('team_id').references('teams.id')
    table.string('name')
    table.jsonb('config')
    table.timestamps()
  })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('strategies')
  ])
}
