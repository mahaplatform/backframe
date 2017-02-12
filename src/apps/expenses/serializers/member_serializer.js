export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    user: {
      full_name: object.related('user').get('full_name'),
      initials: object.related('user').get('initials'),
      photo: object.related('user').related('photo').get('url'),
      email: object.related('user').get('email')
    },
    is_owner: object.get('is_owner')
  })

}
