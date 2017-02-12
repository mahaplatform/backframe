exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('roles_apps', function (table) {
    table.increments('id').primary()
    table.integer('role_id').unsigned()
    table.foreign('role_id').references('roles.id')
    table.integer('app_id').unsigned()
    table.foreign('app_id').references('apps.id')
    table.timestamps()
  })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('roles_apps')
  ])
}
