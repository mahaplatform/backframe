exports.seed = (knex, Promise) => {

  return knex('expenses_member_types').del().then(() => {

    return knex('expenses_member_types').insert([
      {
        name: 'Owner'
      }, {
        name: 'Approver'
      }, {
        name: 'Member'
      }
    ])

  })

}
