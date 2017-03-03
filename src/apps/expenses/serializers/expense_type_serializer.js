export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    code: object.get('code'),
    title: object.get('title'),
    text: object.get('text'),
    description: object.get('description'),
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
