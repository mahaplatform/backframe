import BackframeError from './error'
import moment from 'moment'
import Route from './route'

class DestroyRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setMethod('delete')
    this.setPath('/:id')
    this.setProcessor(this._processor)
    if(config.model) this.setModel(config.model)
  }

  setModel(model) {
    this._setRouteParams('model', model)
  }

  async _processor(req, trx, options) {

    try {

      const frozen = { ...req.resource.attributes }

      if(!options.dependents) await this._destroyRelated(options, req.resource, trx)

      await this._destroyResource(options, req.resource, trx)

      return {
        toJSON: () => frozen,
        get: (value) => frozen[value]
      }

    } catch(err) {

      throw new BackframeError({
        code: 422,
        message: 'Unable to destroy record',
        errors: err.errors ? err.toJSON() : err.message
      })

    }
  }

  _destroyRelated() {

  }

  _destroyResource(options, resource, trx) {

    if(!options.softDelete) return resource.destroy({ transacting: trx })

    return resource.save({
      deleted_at: moment()
    }, {
      patch: true,
      transacting: trx
    })

  }

}

export default DestroyRoute
