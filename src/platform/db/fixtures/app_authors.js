exports.seed = (knex, Promise) => {
  return knex('app_authors').del().then(() => {
    return knex('app_authors').insert([
      {
        id: 1,
        name: 'CCE Tompkins'
      }, {
        id: 2,
        name: 'Think Topography'
      }
    ])
  })
}
