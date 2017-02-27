exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('teams', function (table) {
      table.integer('logo_id').unsigned()
      table.foreign('logo_id').references('assets.id')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('teams', function (table) {
    table.dropColumn('logo_id')
  })
  ])
}
