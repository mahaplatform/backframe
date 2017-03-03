exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('imports', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('upload_id').unsigned()
      table.foreign('upload_id').references('assets.id')
      table.jsonb('mappings')
      table.string('delimiter')
      table.string('enclosure')
      table.string('ignore_first_line')

      table.integer('total_items_count')
      table.integer('invalid_items_count')
      table.integer('imported_items_count')
      table.integer('ignored_items_count')
      table.integer('rejected_items_count')
      table.integer('new_items_count')
      table.integer('merged_items_count')
      table.integer('duplicate_items_count')

      table.string('status')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('imports')
  ])
}
