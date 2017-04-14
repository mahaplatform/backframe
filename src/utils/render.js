import Promise from 'bluebird'
import _ from 'lodash'
import cache from './cache'

export default (options) => {

  return (req, result, resolve, reject) => {

    const serialize = () => {

      if(!options.serializer) {
        return Promise.resolve(result)
      }

      return new Promise((resolve, reject) => _.isPlainObject(result) ? resolve(result.toJSON()) : options.serializer(req, result, resolve, reject))

    }

    if(options.cacheFor) {

      if(!options.redis && process.env.NODE_ENV == 'development') {
        return reject({ code: 412, message: `you must include a redis configuration` })
      }

      const key = `${options.name}-${result.get('id')}-${Math.floor(result.get('updated_at').getTime() / 1000)}`

      return cache(options)(key, options.cacheFor, serialize).then(resolve)

    }

    return serialize().then(resolve)

  }

}
