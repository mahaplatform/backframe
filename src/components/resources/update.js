import _ from 'lodash'
import { coerceArray, toList } from '../../utils/core'
import { defaultRenderer, defaultResponder } from '../../utils'
import load from '../../utils/load'

export default (buildRoute) => {

  const alterRequest = options => (req, resolve, reject) => {

    req.data = {
      ...req.body,
      ...req.query
    }

    resolve(req)

  }

  const beforeHooks = options => (req, resolve, reject) => {

    const unpermitted = Object.keys(req.data).filter(key => {
      return !_.includes(coerceArray(options.allowedParams), key)
    })

    if(unpermitted.length > 0 && process.env.NODE_ENV == 'development') {
      return reject({ code: 422, message: `Unable to update record with the values ${toList(unpermitted)}. Please add it to 'allowedParams'` })
    }

    resolve()

  }

  const processor = options => (req, resolve, reject) => {

    return load(options)(req).then(resource => {

      const data = _.pick(req.data, options.allowedParams)

      return resource.save(data, { patch: true }).then(resolve)

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to update record`, errors: err.toJSON() })

      throw err

    })

  }

  return buildRoute({
    method: 'patch',
    path: '/:id',
    alterRequest,
    beforeHooks,
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully updated record')
  })

}
