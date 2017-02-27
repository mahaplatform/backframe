module.exports = {
  tableName: 'expenses_approvals',
  records: [
    {
      team_id: 1,
      owner_type: 'expenses_expenses',
      owner_id: 1,
      approved_by_id: 47,
      date: '2017-01-01',
      is_approved: true,
      reason_rejected: null
    }, {
      team_id: 1,
      owner_type: 'expenses_expenses',
      owner_id: 2,
      approved_by_id: null,
      date: '2017-01-01',
      is_approved: null,
      reason_rejected: null
    }, {
      team_id: 1,
      owner_type: 'expenses_expenses',
      owner_id: 3,
      approved_by_id: null,
      date: '2017-01-01',
      is_approved: null,
      reason_rejected: null
    }, {
      team_id: 1,
      owner_type: 'expenses_expenses',
      owner_id: 4,
      approved_by_id: 47,
      date: '2017-01-01',
      is_approved: false,
      reason_rejected: 'invalid expense code'
    }, {
      team_id: 1,
      owner_type: 'expenses_expenses',
      owner_id: 5,
      approved_by_id: null,
      date: '2017-01-01',
      is_approved: null,
      reason_rejected: null
    }
  ]
}
