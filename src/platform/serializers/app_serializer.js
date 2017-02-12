export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    title: object.get('title'),
    author: {
      id: object.related('author').get('id'),
      name: object.related('author').get('name')
    },
    version: object.get('version'),
    short_description: object.get('short_description'),
    long_description: object.get('long_description'),
    icon: object.get('icon'),
    category: {
      id: object.related('category').get('id'),
      title: object.related('category').get('title')
    },
    installed: object.get('team_id') !== null
  })

}
