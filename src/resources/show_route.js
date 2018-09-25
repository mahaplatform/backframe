import Route from '../route'

class ShowRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setAction('show')
    this.setMethod('get')
    this.setPath('/:id')
    this.setProcessor(this._processor)
    if(config.defaultQuery) this.setDefaultQuery(config.defaultQuery)
    if(config.model) this.setModel(config.model)
    if(config.primaryKey) this.setPrimaryKey(config.primaryKey)
  }

  setDefaultQuery(defaultQuery) {
    this._setOption('defaultQuery', _.castArray(defaultQuery))
  }
  
  setModel(model) {
    this._setOption('model', model)
  }

  setPrimaryKey(primaryKey) {
    this._setOption('primaryKey', primaryKey)
  }

  async _processor(req, trx, options) {

    return req.resource

  }

}

export default ShowRoute
