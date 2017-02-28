module.exports = {
  tableName: 'roles',
  records: [
    {
      id: 1,
      team_id: 1,
      title: 'Administrator',
      description: 'Users who have adminstraive access to the entire platform'
    }, {
      id: 2,
      team_id: 1,
      title: 'Finance',
      description: 'Users where have access to financial reporting information'
    }, {
      id: 3,
      team_id: 1,
      title: 'Employee',
      description: 'Users who have access to staff tools'
    }
  ]
}
