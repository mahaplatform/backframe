module.exports = {
  tableName: 'rights',
  records: [
    {
      id: 1,
      app_id: 1,
      text: 'ADMIN TEAM',
      description: 'user can manage team settings'
    }, {
      id: 2,
      app_id: 2,
      text: 'MANAGE CONFIGURATION',
      description: 'user can manage projects and expense types'
    }, {
      id: 3,
      app_id: 2,
      text: 'MANAGE EXPENSES',
      description: 'user can manage their own advances, expenses, and trips'
    }, {
      id: 4,
      app_id: 2,
      text: 'APPROVE EXPENSES',
      description: 'user can approve other users advances, expense, and trip reports for projects they own'
    }, {
      id: 5,
      app_id: 2,
      text: 'ACCESS REPORTS',
      description: 'user can access advance, expense, and trip reports'
    }
  ]
}
