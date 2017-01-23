
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tickets', function(t){
    t.increments('id').primary()
    t.integer('user_id').unsigned()
    t.foreign('user_id').references('users.id')
    t.string('text').unsigned()
    t.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tickets')
}
