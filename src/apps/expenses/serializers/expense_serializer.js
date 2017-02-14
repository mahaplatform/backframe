export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    date: object.get('date'),
    description: object.get('description'),
    expense_type: {
      id: object.related('expense_type').get('id'),
      code: object.related('expense_type').get('code'),
      title: object.related('expense_type').get('title'),
      description: object.related('expense_type').get('description')
    },
    project: {
      id: object.related('project').get('id'),
      title: object.related('project').get('title')
    },
    vendor: {
      id: object.related('vendor').get('id'),
      name: object.related('vendor').get('name')
    },
    user: {
      full_name: object.related('user').get('full_name'),
      initials: object.related('user').get('initials'),
      photo: object.related('user').related('photo').get('url'),
      email: object.related('user').get('email')
    },
    amount: object.get('amount'),
    is_visa: object.get('is_visa'),
    is_approved: object.get('is_approved'),
    reason_rejected: object.get('reason_rejected')
  })

}
