import Route from './route'
import _ from 'lodash'

class ShowRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setMethod('get')
    this.setPath('/:id')
    this.setProcessor(this._processor)
    if(config.model) this.setModel(config.model)
    if(config.serializer) this.setSerializer(config.serializer)
  }

  setModel(model) {
    this._setRouteParams('model', model)
  }

  setSerializer(serializer) {
    this._setRouteParams('serializer', serializer)
  }

  async _processor(req, trx, options) {

    return req.resource

  }

}

export default ShowRoute
