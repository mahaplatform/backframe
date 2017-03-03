export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    user: {
      full_name: object.related('user').get('full_name'),
      initials: object.related('user').get('initials'),
      photo: object.related('user').related('photo').get('url'),
      email: object.related('user').get('email')
    },
    member_type: {
      id: object.related('member_type').get('id'),
      name: object.related('member_type').get('name')
    }
  })

}
