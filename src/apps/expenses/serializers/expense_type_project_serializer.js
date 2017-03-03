export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    expense_type: {
      id: object.related('expense_type').get('id'),
      title: object.related('expense_type').get('title'),
      code: object.related('expense_type').get('code')
    },
    project: {
      id: object.related('project').get('id'),
      title: object.related('project').get('title')
    },
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
