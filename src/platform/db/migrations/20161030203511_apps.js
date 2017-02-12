exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('apps', function (table) {
    table.increments('id').primary()
    table.integer('app_category_id').unsigned()
    table.foreign('app_category_id').references('app_categories.id')
    table.integer('app_author_id').unsigned()
    table.foreign('app_author_id').references('app_authors.id')
    table.string('title')
    table.string('version')
    table.string('short_description')
    table.text('long_description')
    table.string('icon')
    table.timestamps()
    table.unique('title')
  })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('apps')
  ])
}
