
exports.up = function(knex, Promise) {
  return knex.schema.createTable('activities', function(t){
    t.increments('id').primary()
    t.integer('user_id').unsigned()
    t.foreign('user_id').references('users.id')
    t.integer('story_id').unsigned()
    t.foreign('story_id').references('stories.id')
    t.string('path')
    t.string('object')
    t.string('target')
    t.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activities')
}
