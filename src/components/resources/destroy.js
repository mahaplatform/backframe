import { defaultResponder } from '../../utils'
import BackframeError from '../../utils/error'

export default (buildRoute, options) => {

  const destroyRelated = async (options, resource, trx) => {

    if(!options.dependents) return resource

    await Promise.each(options.dependents, async (dependent, index, length) => {

      await resource.load([dependent.relationship], { transacting: trx })

      const related_ids = resource.related(dependent.relationship).map(item => item.id)

      if(related_ids.length === 0) return

      const results = await resource.related(dependent.relationship).model.query(qb => qb.whereIn('id', related_ids)).fetchAll({ transacting: trx })

      const records = results.map(result => result)

      await Promise.each(records, (record, index, length) => {

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

      // create a frozen copy so that after hooks can still access properties
      const frozen = Object.assign({}, req.resource.attributes)

      await destroyRelated(options, req.resource, trx)

      await destroyResource(options, req.resource, trx)

      return {
        get: (value) => frozen[value]
      }

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
