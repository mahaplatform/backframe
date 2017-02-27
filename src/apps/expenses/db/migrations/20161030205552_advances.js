exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses_advances', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('expenses_projects.id')
      table.integer('expense_type_id').unsigned()
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.integer('vendor_id').unsigned()
      table.foreign('vendor_id').references('expenses_vendors.id')
      table.string('delivery_method')
      table.string('code')
      table.date('date_needed')
      table.decimal('amount', 6, 2)
      table.text('description')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses_advances')
  ])
}
