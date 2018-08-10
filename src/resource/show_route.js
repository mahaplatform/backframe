import Route from '../route'

class ShowRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setAction('show')
    this.setMethod('get')
    this.setPath('')
    this.setProcessor(this._processor)
    if(config.model) this.setModel(config.model)
  }

  setModel(model) {
    this._setRouteParams('model', model)
  }

  async _processor(req, trx, options) {

    return req.resource

  }

}

export default ShowRoute
