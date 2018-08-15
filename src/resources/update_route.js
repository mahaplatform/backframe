import BackframeError from '../error'
import Route from '../route'
import _ from 'lodash'

class UpdateRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setAction('update')
    this.setMethod('patch')
    this.setPath('/:id')
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

    try {

      const params = this._allowedParams(req.body, options.allowedParams, options.virtualParams)

      await req.resource.save(params, {
        patch: true,
        transacting: trx
      })

      return req.resource

    } catch(err) {

      throw new BackframeError({
        code: 422,
        message: 'Unable to update record',
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

}

export default UpdateRoute
