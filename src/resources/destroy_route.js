import BackframeError from '../error'
import moment from 'moment'
import Route from '../route'
import _ from 'lodash'

class DestroyRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setAction('destroy')
    this.setMethod('delete')
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

    const primary_key = options.primaryKey || 'id'

    try {

      const frozen = await options.model.where({
        [primary_key]: req.params.id
      }).fetch({
        transacting: trx,
        withRelated: options.withRelated ? _.castArray(options.withRelated): []
      })

      if(options.dependents) await this._destroyRelated(req, trx, options)

      await this._destroyResource(options, req.resource, trx)

      return frozen

    } catch(err) {

      throw new BackframeError({
        code: 422,
        message: 'Unable to destroy record',
        errors: err.errors ? err.toJSON() : err.message
      })

    }
  }

  async _destroyRelated(req, trx, options) {

    await Promise.map(options.dependents, async (dependent) => {

      await req.resource.load([dependent.relationship], { transacting: trx })

      const results = req.resource.related(dependent.relationship)

      if(results.length === 0) return

      await Promise.map(results.toArray(), async (record) => {

        if(dependent.strategy === 'destroy') return await record.destroy({ transacting: trx })

        await record.save({ [dependent.foreignKey]: null }, { patch: true, transacting: trx })

      })

    })

  }

  async _destroyResource(options, resource, trx) {

    if(!options.softDelete) return await resource.destroy({ transacting: trx })

    return await resource.save({
      deleted_at: moment()
    }, {
      patch: true,
      transacting: trx
    })

  }

}

export default DestroyRoute
