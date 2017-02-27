exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses_trips', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('expenses_projects.id')
      table.date('date')
      table.text('description')
      table.time('time_leaving')
      table.time('time_arriving')
      table.integer('odometer_start').unsigned()
      table.integer('odometer_end').unsigned()
      table.integer('total_miles')
      table.decimal('mileage_rate', 6, 2)
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses_trips')
  ])
}
