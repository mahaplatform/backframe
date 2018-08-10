import BackframeError from './error'
import Route from './route'
import _ from 'lodash'

class UpdateRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setMethod('patch')
    this.setPath('/:id')
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

      const allowed = [
        ..._.castArray(options.allowedParams),
        ..._.castArray(options.virtualParams)
      ]

      const params = _.pick(req.body, allowed)

      req.resource.save(params, {
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

}

export default UpdateRoute
