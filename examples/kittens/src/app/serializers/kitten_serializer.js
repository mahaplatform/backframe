export default (req, trx, kitten) => {

  return {
    id: kitten.get('id'),
    name: kitten.get('name'),
    age: kitten.get('age')
  }

}
