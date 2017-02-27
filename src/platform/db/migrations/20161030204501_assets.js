exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('assets', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.string('status')
      table.string('original_file_name')
      table.string('file_name')
      table.string('content_type')
      table.integer('file_size')
      table.string('fingerprint')
      table.integer('width')
      table.integer('height')
      table.integer('chunks_total')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('assets')
  ])
}
