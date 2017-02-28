module.exports = {
  label: 'Expenses', icon: 'dollar', items: [
    { label: 'Configuration', rights: ['expenses.manage_configuration'], items: [
      { label: 'Expense Types', route: '/admin/expenses/expense_types' },
      { label: 'Projects', route: '/admin/expenses/projects' },
      { label: 'Vendors', route: '/admin/expenses/vendors' }
    ] },
    { label: 'Approvals', rights: ['expenses.approve_expenses'], items: [
      { label: 'Advances', route: '/admin/expenses/approvals/advances'},
      { label: 'Expenses', route: '/admin/expenses/approvals/expenses'},
      { label: 'Trips', route: '/admin/expenses/approvals/trips' }
    ] },
    { label: 'Reports', rights: ['expenses.access_reports'], items: [
      { label: 'Advances', route: '/admin/expenses/reports/advances'},
      { label: 'Expenses', route: '/admin/expenses/reports/expenses'},
      { label: 'Trips', route: '/admin/expenses/reports/trips' }
    ] },
    { label: 'Advances', rights: ['expenses.manage_expenses'], route: '/admin/expenses/advances' },
    { label: 'Expenses', rights: ['expenses.manage_expenses'], route: '/admin/expenses/expenses' },
    { label: 'Trips', rights: ['expenses.manage_expenses'], route: '/admin/expenses/trips' }
  ]
}
