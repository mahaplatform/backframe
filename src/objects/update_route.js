import BackframeError from './error'
import Route from './route'
import _ from 'lodash'

class UpdateRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setMethod('patch')
    this.setPath('/:id')
    this.appendAlterRequest(this._alterRequest)
    this.appendBeforeProcessor(this._beforeProcessor)
    this.setProcessor(this._processor)
  }

  _alterRequest(req, trx, options) {

   req.data = _.assign(req.body, req.query)

   return req

 }

  _beforeProcessor(req, trx, options) {

    const allowed = [
     ...coerceArray(options.allowedParams),
     ...coerceArray(options.virtualParams),
    ]

    checkPermitted(req.data, allowed, 'Unable to create record with the values {unpermitted}. Please add it to allowedParams')

  }

  async _processor(req, trx, options) {

    return req.resource

  }

}

export default UpdateRoute
