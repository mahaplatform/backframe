import load from '../../utils/load'
import { defaultResponder } from '../../utils'
import BackframeError from '../../utils/error'

export default (buildRoute, options) => {

  const destroyRelated = (options, resource, trx) => {

    if(!options.dependents) return resource

    return Promise.each(options.dependents, async (dependent, index, length) => {

      const results = await dependent.model.where({ [dependent.foreignKey]: resource.get('id') }).fetchAll({ transacting: trx })

      const records = results.map(result => result)

      return Promise.each(records, (record, index, length) => {

        if(dependent.strategy === 'destroy') return record.destroy({ transacting: trx })

        return record.save({ [dependent.foreignKey]: null }, { patch: true, transacting: trx })

      })

    })

  }

  const destroyResource = (options, resource, trx) => {

    if(options.softDelete) return resource.save({ deleted_at: new Date() }, { patch: true, transacting: trx })

    return resource.destroy({ transacting: trx })

  }

  const processor = async (req, trx, options) => {

    try {

      await destroyRelated(options, req.resource, trx)

      return destroyResource(options, req.resource, trx)

    } catch(err) {

      if(err.errors) throw new BackframeError({ code: 422, message: `Unable to delete ${options.name}`, errors: err.toJSON() })

      throw err

    }

  }

  return buildRoute({
    action: 'destroy',
    method: 'delete',
    path: `/:${options.primaryKey}`,
    processor,
    responder: defaultResponder('Successfully deleted record')
  })

}
