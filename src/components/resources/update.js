import _ from 'lodash'
import { coerceArray } from '../../utils/core'
import { defaultRenderer, defaultResponder } from '../../utils'
import load from '../../utils/load'
import { checkPermitted } from '../../utils/options'

export default (buildRoute) => {

  const alterRequest = options => (req, resolve, reject) => {

    req.data = _.assign(req.body, req.query)

    resolve(req)

  }

  const beforeHooks = options => (req, resolve, reject) => {

    checkPermitted(req.data, options.allowedParams, reject, 'Unable to create record with the values {unpermitted}. Please add it to allowedParams')

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
