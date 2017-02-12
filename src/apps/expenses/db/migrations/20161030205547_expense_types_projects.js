exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses_expense_types_projects', function (table) {
      table.increments('id').primary()
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('expenses_projects.id')
      table.integer('expense_type_id').unsigned()
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses_expense_types_projects')
  ])
}
