import _ from 'lodash'

export default (options) => (req, trx, result) => {

  const useSerializer = !_.isPlainObject(result) && !_.isNil(options.serializer)

  const serialize = () => useSerializer ? options.serializer(req, trx, result) : result.toJSON()

  return serialize()

}
