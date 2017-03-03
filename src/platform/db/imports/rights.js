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
      text: 'APPROVE ALL EXPENSES',
      description: 'approve advances, expense, and trip reports for all projects'
    }, {
      id: 6,
      app_id: 2,
      text: 'APPROVE EXPENSES',
      description: 'approve other users advances, expense, and trip reports for projects of which they are members'
    }, {
      id: 7,
      app_id: 2,
      text: 'ACCESS REPORTS',
      description: 'access advance, expense, and trip reports'
    }, {
      id: 8,
      app_id: 2,
      text: 'MANAGE EXPENSES',
      description: 'manage their own advances, expenses, and trips'
    }
  ]
}
