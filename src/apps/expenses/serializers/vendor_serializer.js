export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
