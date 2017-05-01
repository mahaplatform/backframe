export default (req, kitten) => {

  return {
    id: kitten.get('id'),
    name: kitten.get('name'),
    age: kitten.get('age')
  }

}
