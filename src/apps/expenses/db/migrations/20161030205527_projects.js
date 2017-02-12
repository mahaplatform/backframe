exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses_projects', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('users.id')
      table.string('title')
      table.string('code').unique()
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses_projects')
  ])
}
