exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses_members', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('expenses_projects.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.boolean('is_owner')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses_members')
  ])
}
