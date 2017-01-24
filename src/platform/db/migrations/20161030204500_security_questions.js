exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('security_questions', function (table) {
      table.increments('id').primary()
      table.string('text')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('security_questions')
  ])
}
