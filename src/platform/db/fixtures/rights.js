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
      text: 'MANAGE EXPENSES',
      description: 'user can manage their own advances, expenses, and trips'
    }, {
      id: 3,
      app_id: 2,
      text: 'SUPERVISE EXPENSES',
      description: 'user can access all advances, expense, and trip reports'
    }, {
      id: 4,
      app_id: 2,
      text: 'ADMIN EXPENSES',
      description: 'user can manage projects, vendors, and expense types'
    }
  ]
}
