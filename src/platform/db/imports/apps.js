module.exports = {
  tableName: 'apps',
  records: [
    {
      id: 1,
      title: 'Team',
      app_category_id: 1,
      app_author_id: 1,
      short_description: 'Manage team settings, users, apps, access, and activity',
      long_description: 'Tools for managing users, apps, access, and activity',
      version: '1.0.0',
      icon: 'users'
    }, {
      id: 2,
      title: 'Expenses',
      app_category_id: 4,
      app_author_id: 1,
      short_description: 'Manage expenses for expenses, advances, and trips',
      long_description: 'Tools for managing expenses, advances, and trips',
      version: '1.0.0',
      icon: 'dollar'
    }
  ]
}
