export default (object) => {


  return Promise.resolve({
    id: object.get('id'),
    owner: owner_type(object.get('owner_type'), object.related('owner')),
    approved_by: object.related('approved_by').get('id') ? {
      full_name: object.related('approved_by').get('full_name'),
      initials: object.related('approved_by').get('initials'),
      photo: object.related('approved_by').related('photo').get('url'),
      email: object.related('approved_by').get('email')
    } : null,
    is_approved: object.get('is_approved'),
    reason_rejected: object.get('reason_rejected'),
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}

const owner_type = (owner_type, owner) => {
  if(owner_type === 'expenses_advances') {
    return {
      type: 'Advance'
    }
  } else if(owner_type === 'expenses_expenses') {
    return {
      type: 'Expense',
      project: {
        id: owner.related('project').get('id'),
        title: owner.related('project').get('title')
      },
      user: {
        full_name: owner.related('user').get('full_name'),
        initials: owner.related('user').get('initials'),
        photo: owner.related('user').related('photo').get('url'),
        email: owner.related('user').get('email')
      }
    }
  } else if(owner_type === 'expenses_trips') {
    return 'Trip'
  }
}
