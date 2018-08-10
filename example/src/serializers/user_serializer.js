const user_serializer = (req, trx, record, options) => ({

  id: record.get('id'),

  first_name: record.get('first_name'),

  last_name: record.get('last_name'),

  email: record.get('email'),

  photo: record.related('photo').get('file_name'),

  created_at: record.get('created_at'),

  updated_at: record.get('updated_at')

})

export default user_serializer
