import _ from 'lodash'
import { coerceArray, toList } from '../../utils/core'
import { defaultRenderer, defaultResponder } from '../../utils'

export default  (buildRoute) => {

  const alterRequest = options => (req, resolve, reject) => {

    req.data = {
      ...req.body,
      ...req.defaults,
      ...req.query
    }

    resolve(req)

  }

  const beforeHooks = options => (req, resolve, reject) => {

    const unpermitted = Object.keys(req.data).filter(key => {
      return !_.includes(coerceArray(options.allowedParams), key)
    })

    if(unpermitted.length > 0 && process.env.NODE_ENV == 'development') {
      return reject({ code: 412, message: `Unable to create record with the values ${toList(unpermitted)}. Please add it to 'allowedParams'` })
    }

    resolve()

  }

  const processor = options => (req, resolve, reject) => {

    const data = {
      ...options.defaultParams ? options.defaultParams(req) : {},
      ..._.pick(req.data, options.allowedParams)
    }

    return options.model.forge(data).save().then(resolve).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to create record`, errors: err.toJSON() })

      throw err

    })

  }

  const renderer = options => defaultRenderer(options)

  const responder = options => defaultResponder(200, 'Successfully created record')

  return buildRoute({
    method: 'post',
    path: '',
    alterRequest,
    beforeHooks,
    processor,
    renderer,
    responder
  })

}
