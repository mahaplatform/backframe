module.exports = {
  label: 'Expenses', rights: [], icon: 'dollar', items: [
    { label: 'Approvals', rights: [], items:[
      { label: 'Expenses', rights: [], route: '/admin/expenses/projects' }
    ] },
    { label: 'Reports', rights: [], items:[
      { label: 'Expenses', rights: [], route: '/admin/expenses/projects' }
    ] },
    { label: 'Projects', rights: [], route: '/admin/expenses/projects' },
    { label: 'Expense Types', route: '/admin/expenses/expense_types' },
    { label: 'Vendors', rights: [], route: '/admin/expenses/vendors' },
    { label: 'Advances', rights: [], route: '/admin/expenses/advances' },
    { label: 'Expenses', rights: [], route: '/admin/expenses/expenses' },
    { label: 'Trips', rights: [], route: '/admin/expenses/trips' }
  ]
}
