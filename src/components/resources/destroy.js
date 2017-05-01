import load from '../../utils/load'
import { defaultResponder } from '../../utils'
import BackframeError from '../../utils/error'

export default (buildRoute) => {

  const destroyRelated = (options, resource, resolve, reject) => {

    if(!options.dependents) return resolve(resource)

    return Promise.each(options.dependents, (dependent, index, length) => {

      return dependent.model.where({ [dependent.foreignKey]: resource.get('id') }).fetchAll().then(results => {

        const records = results.map(result => result)

        return Promise.each(records, (record, index, length) => {

          return (dependent.strategy === 'destroy') ? record.destroy() : record.save({ [dependent.foreignKey]: null }, { patch: true })

        })

      })

    }).then(resolve(resource))

  }

  const destroyResource = (options, resource) => {

    return options.softDelete ? resource.save({ deleted_at: new Date() }, { patch: true }) : resource.destroy()

  }

  const processor = options => req => {

    return load(options)(req).then(resource => {

      return new Promise((resolve, reject) => destroyRelated(options, resource, resolve, reject))

    }).then(resource => {

      return destroyResource(options, resource)

    }).catch(err => {

      if(err.errors) throw new BackframeError({ code: 422, message: `Unable to delete ${options.name}`, errors: err.toJSON() })

      throw err

    })

  }

  return buildRoute({
    method: 'delete',
    path: '/:id',
    processor,
    responder: defaultResponder('Successfully deleted record')
  })

}
