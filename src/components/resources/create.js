import _ from 'lodash'
import { coerceArray } from '../../utils/core'
import { defaultRenderer, defaultResponder } from '../../utils'
import { checkPermitted } from '../../utils/options'
import BackframeError from '../../utils/error'

export default  (buildRoute) => {

  const alterRequest = options => (req, resolve, reject) => {

    req.data = _.assign(req.body, req.defaults, req.query)

    resolve(req)

  }

  const beforeHooks = options => (req, resolve, reject) => {

    checkPermitted(req.data, options.allowedParams, reject, 'Unable to create record with the values {unpermitted}. Please add it to allowedParams')

    resolve()

  }

  const processor = options => (req, resolve, reject) => {

    const data = {
      ...options.defaultParams ? options.defaultParams(req) : {},
      ..._.pick(req.data, options.allowedParams)
    }

    return options.model.forge(data).save().then(resolve).catch(err => {

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
