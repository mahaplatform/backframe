module.exports = {
  rights: [
    {
      text: 'MANAGE EXPENSES',
      description: 'user can manage their own advances, expenses, and trips'
    }, {
      text: 'SUPERVISE EXPENSES',
      description: 'user can access all advances, expense, and trip reports'
    }, {
      text: 'ADMIN EXPENSES',
      description: 'ser can manage projects, vendors, and expense types'
    }
  ],
  navigation: {
    label: 'Expenses', icon: 'dollar', rights: ['MANAGE EXPENSES'], items: [
      { label: 'Advances', rights: ['MANAGE EXPENSES'], route: '/admin/expenses/advances' },
      { label: 'Expenses', rights: ['MANAGE EXPENSES'], route: '/admin/expenses/expenses' },
      { label: 'Trips', rights: ['MANAGE EXPENSES'], route: '/admin/expenses/trips' },
      { label: 'Admin', rights: ['ADMIN EXPENSES'], items: [
        { label: 'Expense Types', rights: ['ADMIN EXPENSES'], route: '/admin/expenses/expense_types' },
        { label: 'Projects', rights: ['ADMIN EXPENSES'], route: '/admin/expenses/projects' },
        { label: 'Vendors', rights: ['ADMIN EXPENSES'], route: '/admin/expenses/vendors' },
        { label: 'Reports', rights: ['ADMIN EXPENSES'], route: '/admin/expenses/reports' }
      ] }
    ]
  }
}
