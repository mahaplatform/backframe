exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('password_salt')
      table.string('password_hash')
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('assets.id')
      table.integer('security_question_1_id').unsigned()
      table.foreign('security_question_1_id').references('security_questions.id')
      table.string('security_question_1_answer')
      table.integer('security_question_2_id').unsigned()
      table.foreign('security_question_2_id').references('security_questions.id')
      table.string('security_question_2_answer')
      table.timestamp('activated_at')
      table.timestamp('reset_at')
      table.timestamp('logged_out_at')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
