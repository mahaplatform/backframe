exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_roles', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('role_id').unsigned()
      table.foreign('role_id').references('roles.id')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_roles')
  ])
}
