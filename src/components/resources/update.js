import _ from 'lodash'
import { coerceArray } from '../../utils/core'
import { defaultRenderer, defaultResponder } from '../../utils'
import load from '../../utils/load'
import { checkPermitted } from '../../utils/options'
import BackframeError from '../../utils/error'

export default (buildRoute) => {

  const alterRequest = (req, trx, options) => {

    req.data = _.assign(req.body, req.query)

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

      const data = _.pick(req.data, options.allowedParams)

      req.resource = await req.resource.save(data, { patch: true, transacting: trx })

      return req.resource

    } catch(err) {

      if(err.errors) throw new BackframeError({ code: 422, message: `Unable to update record`, errors: err.toJSON() })

      throw err

    }

  }

  return buildRoute({
    action: 'update',
    method: 'patch',
    path: '/:id',
    alterRequest,
    beforeProcessor,
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully updated record')
  })

}
