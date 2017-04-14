export default (req, kitten, resolve, reject) => {

  resolve({
    id: kitten.get('id'),
    name: kitten.get('name'),
    age: kitten.get('age')
  })

}
