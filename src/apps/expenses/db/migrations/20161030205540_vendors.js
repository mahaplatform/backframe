exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses_vendors', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.string('name')
      table.string('address_1')
      table.string('address_2')
      table.string('city')
      table.string('state')
      table.string('zip')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses_vendors')
  ])
}
