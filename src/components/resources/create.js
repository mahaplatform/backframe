import _ from 'lodash'
import { coerceArray } from '../../utils/core'
import { defaultParams, defaultRenderer, defaultResponder } from '../../utils'
import { checkPermitted } from '../../utils/options'
import BackframeError from '../../utils/error'

export default  (buildRoute) => {

  const alterRequest = (req, trx, options) => {

    req.data = _.assign(req.body, req.defaults, req.query)

    return req

  }

  const beforeProcessor = (req, trx, options) => {

    const allowed = [
      ...coerceArray(options.allowedParams),
      ...coerceArray(options.virtualParams),
    ]

    checkPermitted(req.data, allowed, 'Unable to create record with the values {unpermitted}. Please add it to allowedParams')

  }

  const processor = async (req, trx, options) => {

    try {

      const data = {
        ...defaultParams(req, trx, options),
        ..._.pick(req.data, options.allowedParams)
      }

      req.resource = await options.model.forge(data).save(null, { transacting: trx })

      return req.resource

    } catch(err) {

        if(err.errors) throw new BackframeError({ code: 422, message: `Unable to create record`, errors: err.toJSON() })

        throw err

    }

  }

  return buildRoute({
    action: 'create',
    method: 'post',
    path: '',
    alterRequest,
    beforeProcessor,
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully created record')
  })

}
