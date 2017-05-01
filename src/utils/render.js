import _ from 'lodash'
import cache from './cache'
import BackframeError from './error'

export default (options) => {

  return (req, result, resolve, reject) => {

    const useSerializer = !_.isPlainObject(result) && !_.isNil(options.serializer)

    const serialize = () => useSerializer ? new Promise((resolve, reject) => options.serializer(req, result, resolve, reject)) : Promise.resolve(result.toJSON())

    if(options.cacheFor) {

      if(!options.redis && process.env.NODE_ENV == 'development') {
        throw new BackframeError({ code: 412, message: `you must include a redis configuration` })
      }

      const key = `${options.name}-${result.get('id')}-${Math.floor(result.get('updated_at').getTime() / 1000)}`

      return cache(options)(key, options.cacheFor, serialize)

    }

    return serialize().then(resolve)

  }

}
