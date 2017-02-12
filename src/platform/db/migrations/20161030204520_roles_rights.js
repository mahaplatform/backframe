exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('roles_rights', function (table) {
    table.increments('id').primary()
    table.integer('role_id').unsigned()
    table.foreign('role_id').references('roles.id')
    table.integer('right_id').unsigned()
    table.foreign('right_id').references('rights.id')
    table.timestamps()
  })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('roles_rights')
  ])
}
