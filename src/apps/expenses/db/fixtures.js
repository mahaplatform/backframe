
exports.seed = (knex, Promise) => {
  return knex('expenses_projects').del()
  .then(() => {
    return knex('expenses_projects').insert([
      {
        team_id: 1,
        title: 'Primitive Pursuits',
        code: '1234'
      }, {
        team_id: 1,
        title: 'Eat Smart New York',
        code: '5678'
      }, {
        team_id: 1,
        title: 'Website Platform',
        code: '9012'
      }
    ])
  })
  .then(() => {
    return knex('expenses_members').del()
  })
  .then(() => {
    return knex('expenses_members').insert([
      {
        team_id: 1,
        project_id: 1,
        user_id: 64
      }, {
        team_id: 1,
        project_id: 1,
        user_id: 54
      }, {
        team_id: 1,
        project_id: 1,
        user_id: 49
      }, {
        team_id: 1,
        project_id: 1,
        user_id: 95
      }, {
        team_id: 1,
        project_id: 1,
        user_id: 63
      }, {
        team_id: 1,
        project_id: 2,
        user_id: 13
      }, {
        team_id: 1,
        project_id: 2,
        user_id: 48
      }, {
        team_id: 1,
        project_id: 2,
        user_id: 1
      }, {
        team_id: 1,
        project_id: 3,
        user_id: 19
      }, {
        team_id: 1,
        project_id: 3,
        user_id: 21
      }, {
        team_id: 1,
        project_id: 3,
        user_id: 1
      }
    ])
  })
  .then(() => {
    return knex('expenses_vendors').del()
  })
  .then(() => {
    return knex('expenses_vendors').insert([
      {
        team_id: 1,
        name: 'Walmart'
      }, {
        team_id: 1,
        name: 'Target'
      }, {
        team_id: 1,
        name: 'Wegmans'
      }
    ])
  })
  .then(() => {
    return knex('expenses_expense_types').del()
  })
  .then(() => {
    return knex('expenses_expense_types').insert([
      {
        team_id: 1,
        title: 'Test Expense Type',
        code: '1234'
      }, {
        team_id: 1,
        title: 'Test Expense Type 2',
        code: '5678'
      }
    ])
  })
  .then(() => {
    return knex('expenses_advances').del()
  })
  // .then(() => {
  //   return knex('expenses_advances').insert([
  //   ])
  // })
  .then(() => {
    return knex('expenses_trips').del()
  })
  // .then(() => {
  //   return knex('expenses_trips').insert([
  //   ])
  // })
  .then(() => {
    return knex('expenses_expenses').del()
  })
  .then(() => {
    return knex('expenses_expenses').insert([
      {
        team_id: 1,
        user_id: 1,
        project_id: 1,
        expense_type_id: 1,
        vendor_id: 1,
        date: '2017-01-01',
        description: 'test',
        amount: 83.62,
        is_visa: false
      },{
        team_id: 1,
        user_id: 2,
        project_id: 1,
        expense_type_id: 1,
        vendor_id: 1,
        date: '2017-01-01',
        description: 'test',
        amount: 83.62,
        is_visa: false
      },{
        team_id: 1,
        user_id: 3,
        project_id: 1,
        expense_type_id: 1,
        vendor_id: 1,
        date: '2017-01-01',
        description: 'test',
        amount: 83.62,
        is_visa: false
      },{
        team_id: 1,
        user_id: 1,
        project_id: 2,
        expense_type_id: 1,
        vendor_id: 1,
        date: '2017-01-01',
        description: 'test',
        amount: 83.62,
        is_visa: false
      },{
        team_id: 1,
        user_id: 1,
        project_id: 2,
        expense_type_id: 2,
        vendor_id: 1,
        date: '2017-01-01',
        description: 'test',
        amount: 83.62,
        is_visa: false
      }
    ])
  })
}
