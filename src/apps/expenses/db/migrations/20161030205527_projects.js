exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses_projects', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.string('title')
      table.string('code').unique()
      table.boolean('is_active').defaultTo(false)
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses_projects')
  ])
}
