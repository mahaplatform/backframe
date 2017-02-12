export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    title: object.get('title')
  })

}
