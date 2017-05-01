import _ from 'lodash'
import { coerceArray } from '../../utils/core'
import { defaultRenderer, defaultResponder } from '../../utils'
import { checkPermitted } from '../../utils/options'
import BackframeError from '../../utils/error'

export default  (buildRoute) => {

  const alterRequest = options => req => {

    req.data = _.assign(req.body, req.defaults, req.query)

    return req

  }

  const beforeHooks = options => req => {

    checkPermitted(req.data, options.allowedParams, 'Unable to create record with the values {unpermitted}. Please add it to allowedParams')

  }

  const processor = options => (req, trx) => {

    const data = {
      ...options.defaultParams ? options.defaultParams(req) : {},
      ..._.pick(req.data, options.allowedParams)
    }

    return options.model.forge(data).save(null, { transacting: trx }).catch(err => {

      if(err.errors) throw new BackframeError({ code: 422, message: `Unable to create record`, errors: err.toJSON() })

      throw err

    })

  }

  return buildRoute({
    method: 'post',
    path: '',
    alterRequest,
    beforeHooks,
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully created record')
  })

}
