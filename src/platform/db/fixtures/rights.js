module.exports = {
  tableName: 'rights',
  records: [
    {
      id: 1,
      app_id: 1,
      text: 'MANAGE APPS',
      description: 'install and manage apps and settings'
    }, {
      id: 2,
      app_id: 1,
      text: 'MANAGE PEOPLE',
      description: 'manage users and roles and view activities'
    }, {
      id: 3,
      app_id: 2,
      text: 'MANAGE CONFIGURATION',
      description: 'manage projects and expense types'
    }, {
      id: 4,
      app_id: 2,
      text: 'MANAGE EXPENSES',
      description: 'manage their own advances, expenses, and trips'
    }, {
      id: 5,
      app_id: 2,
      text: 'APPROVE EXPENSES',
      description: 'approve other users advances, expense, and trip reports for projects they own'
    }, {
      id: 6,
      app_id: 2,
      text: 'ACCESS REPORTS',
      description: 'access advance, expense, and trip reports'
    }
  ]
}
