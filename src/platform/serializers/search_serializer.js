export default (object) => ({
  id: object.get('id'),
  text: object.get('text'),
  subtext: object.get('subtext'),
  photo: object.get('photo'),
  route: object.get('email'),
  created_at: object.get('created_at'),
  updated_at: object.get('updated_at')
})
