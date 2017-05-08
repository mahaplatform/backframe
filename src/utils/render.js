import _ from 'lodash'
import cache from './cache'
import BackframeError from './error'

export default (options) => (req, trx, result) => {

  const useSerializer = !_.isPlainObject(result) && !_.isNil(options.serializer)

  const serialize = () => useSerializer ? options.serializer(req, trx, result) : result.toJSON()

  if(!options.cacheFor) return serialize()

  if(!process.env.REDIS_URL && process.env.NODE_ENV == 'development') {
    throw new BackframeError({ code: 412, message: `you must include a redis configuration` })
  }

  const timestamp = _.isDate(result.get('updated_at')) ? result.get('updated_at') : new Date(result.get('updated_at'))

  const key = `${options.name}-${result.get('id')}-${Math.floor(timestamp.getTime() / 1000)}`

  return cache(options)(key, options.cacheFor, serialize)

}
