exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    return knex('users').insert([
      {
        id: 1,
        name: 'Greg Kops',
        email: 'greg@thinktopography.com'
      }, {
        id: 2,
        name: 'Megan Pugh',
        email: 'megan@thinktopography.com'
      }
    ])
  })
  .then(() => {
    return knex('tickets').del()
  })
  .then(() => {
    return knex('tickets').insert([
      {
        id: 1,
        user_id: 1,
        text: 'Ticket 1'
      }, {
        id: 2,
        user_id: 1,
        text: 'Ticket 2'
      }, {
        id: 3,
        user_id: 2,
        text: 'Ticket 3'
      }
    ])
  })
}
