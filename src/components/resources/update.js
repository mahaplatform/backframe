import _ from 'lodash'
import { coerceArray } from '../../utils/core'
import { defaultRenderer, defaultResponder } from '../../utils'
import load from '../../utils/load'
import { checkPermitted } from '../../utils/options'
import BackframeError from '../../utils/error'

export default (buildRoute) => {

  const alterRequest = options => req => {

    req.data = _.assign(req.body, req.query)

    return req

  }

  const beforeHooks = options => req => {

    checkPermitted(req.data, options.allowedParams, 'Unable to create record with the values {unpermitted}. Please add it to allowedParams')

  }

  const processor = options => req => {

    return load(options)(req).then(resource => {

      const data = _.pick(req.data, options.allowedParams)

      return resource.save(data, { patch: true })

    }).catch(err => {

      if(err.errors) throw new BackframeError({ code: 422, message: `Unable to update record`, errors: err.toJSON() })

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
