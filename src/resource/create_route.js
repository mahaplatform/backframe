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
    this._setOption('allowedParams', allowedParams)
  }

  setModel(model) {
    this._setOption('model', model)
  }

  setVirtualParams(virtualParams) {
    this._setOption('virtualParams', virtualParams)
  }

  async _processor(req, trx, options) {

    const defaults = await this._defaultParams(req, trx, options)

    const allowed = await this._allowedParams(req.body, options.allowedParams, options.virtualParams)

    try {

      req.resource = await options.model.forge({
        ...defaults,
        ...allowed
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

  _allowedParams(body, allowedParams, virtualParams) {

    const allowed = [
      ..._.castArray(allowedParams),
      ..._.castArray(virtualParams)
    ]

    return _.pick(body, allowed)

  }

  async _defaultParams(req, trx, options) {

    if(!options.defaultParams) return {}

    return await Promise.reduce(options.defaultParams, async (params, defaultParams) => ({
      ...params,
      ...await defaultParams(req, trx, options)
    }), {})

  }


}

export default CreateRoute
