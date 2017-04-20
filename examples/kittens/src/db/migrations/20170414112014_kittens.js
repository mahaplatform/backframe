exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('kittens', function (table) {
      table.increments('id').primary()
      table.string('name')
      table.integer('age')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('kittens')
  ])
}
