exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses_approvals', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.string('owner_type')
      table.integer('owner_id')
      table.integer('approved_by_id').unsigned()
      table.foreign('approved_by_id').references('users.id')
      table.date('date')
      table.boolean('is_approved')
      table.text('reason_rejected')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses_approvals')
  ])
}
