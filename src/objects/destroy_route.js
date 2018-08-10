import Route from './route'
import _ from 'lodash'

class DestroyRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setMethod('delete')
    this.setPath('/:id')
    this.setProcessor(this._processor)
  }

  async _processor(req, trx, options) {

    return req.resource

  }
  
}

export default DestroyRoute
