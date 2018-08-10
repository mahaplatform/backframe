import BackframeError from '../error'
import Route from '../route'
import _ from 'lodash'

class CreateRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setAction('create')
    this.setMethod('post')
    this.setPath('')
    this.setProcessor(this._processor)
    if(config.allowedParams) this.setAllowedParams(config.allowedParams)
    if(config.model) this.setModel(config.model)
    if(config.virtualParams) this.setVirtualParams(config.virtualParams)
  }

  setAllowedParams(allowedParams) {
    this._setRouteParams('allowedParams', allowedParams)
  }

  setModel(model) {
    this._setRouteParams('model', model)
  }

  setVirtualParams(virtualParams) {
    this._setRouteParams('virtualParams', virtualParams)
  }

  async _processor(req, trx, options) {

    try {

      req.resource = await options.model.forge({
        ...this._defaultParams(req, trx, options),
        ...this._allowedParams(req.body, options.allowedParams, options.virtualParams)
      }).save(null, {
        transacting: trx
      })

      return req.resource

    } catch(err) {

      throw new BackframeError({
        code: 422,
        message: 'Unable to create record',
        errors: err.errors ? err.toJSON() : err.message
      })

    }

  }

  async _defaultParams(req, trx, options) {

    if(!options.defaultParams) return {}

    return await Promise.reduce(options.defaultParams, async (params, defaultParams) => ({
      ...params,
      ...await defaultParams(req, trx, options)
    }), {})

  }

  _allowedParams(body, allowedParams, virtualParams) {

    const allowed = [
      ..._.castArray(allowedParams),
      ..._.castArray(virtualParams)
    ]

    return _.pick(body, allowed)

  }


}

export default CreateRoute
