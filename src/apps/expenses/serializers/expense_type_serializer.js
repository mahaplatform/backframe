export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    code: object.get('code'),
    title: object.get('title'),
    description: object.get('description')
  })

}
