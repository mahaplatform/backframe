
exports.up = function(knex, Promise) {
  return knex.schema.createTable('stories', function(t){
    t.increments('id').primary()
    t.string('text')
    t.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stories')
}
