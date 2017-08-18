import _ from 'lodash'

export default (req, trx, result, options) => {

  const useSerializer = !_.isPlainObject(result) && !_.isNil(options.serializer)

  const serialize = () => useSerializer ? options.serializer(req, trx, result) : result.toJSON()

  return serialize()

}
