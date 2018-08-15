import Route from '../route'
import _ from 'lodash'

class EditRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setAction('edit')
    this.setMethod('get')
    this.setPath('/:id/edit')
    this.setProcessor(this._processor)
    this.setSerializer(this._processor)
    if(config.model) this.setModel(config.model)
  }

  setModel(model) {
    this._setOption('model', model)
  }

  async _processor(req, trx, options) {

    return req.resource

  }

  _serializer(req, trx, record, options) {

    if(!options.allowedParams) return record.toJSON()

    return _.pick(record.toJSON(), options.allowedParams)

  }

}

export default EditRoute
