exports.seed = (knex, Promise) => {
  return knex('searches').del().then(() => {
    return knex('searches').insert([
      {
        id: 1,
        team_id: 1,
        user_id: 1,
        text: 'Ken Schlather',
        subtext: 'ks47@cornell.edu',
        photo: '/image/ken.jpg',
        route: '/admin/contacts/21'
      }
    ])
  })
}
