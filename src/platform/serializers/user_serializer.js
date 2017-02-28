export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    full_name: object.get('full_name'),
    first_name: object.get('first_name'),
    last_name: object.get('last_name'),
    initials: object.get('initials'),
    email: object.get('email'),
    photo: object.related('photo').get('url'),
    role_ids: object.related('roles').map(role => role.get('id')),
    roles: object.related('roles').map(role => ({
      id: role.get('id'),
      title: role.get('title'),
      description: role.get('description')
    })),
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
