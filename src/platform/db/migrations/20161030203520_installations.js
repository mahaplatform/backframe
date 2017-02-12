exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('installations', function (table) {
    table.increments('id').primary()
    table.integer('team_id').unsigned()
    table.foreign('team_id').references('teams.id')
    table.integer('app_id').unsigned()
    table.foreign('app_id').references('apps.id')
    table.timestamps()
  })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('installations')
  ])
}
