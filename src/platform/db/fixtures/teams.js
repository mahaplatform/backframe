exports.seed = (knex, Promise) => {
  return knex('teams').del().then(() => {
    return knex('teams').insert([
      {
        id: 1,
        title: 'Cornell Cooperative Extension of Tompkins County',
        subdomain: 'ccetc',
        logo_id: 104
      }, {
        id: 2,
        title: 'Think Topography',
        subdomain: 'thinktopography',
        logo_id: 105
      }
    ])
  })
}
