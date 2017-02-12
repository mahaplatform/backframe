import Promise from 'bluebird'
import { resourceLogger } from '../utils'
import load from '../helpers/load'
import { succeed } from 'platform/utils/responses'

export default options => {

    const destroyRelated = resource => {

        return Promise.each(options.dependents, (dependent, index, length) => {

            return dependent.model.where({ [dependent.foreignKey]: resource.get('id') }).fetchAll().then(results => {

                const records = results.map(result => result)

                return Promise.each(records, (record, index, length) => {

                    return (dependent.strategy === 'destroy') ? record.destroy() : record.save({ [dependent.foreignKey]: null }, { patch: true })

                })

            })

        })

    }

    const destroyResource = resource => {

        return options.softDelete ? resource.save({ deleted_at: new Date() }, { patch: true }) : resource.destroy()

    }

    const processor = req => {

        return load('destroy', options)(req).then(resource => {

            return destroyRelated(resource).then(() => resource)

        }).then(resource => {

            return destroyResource(resource)

        }).catch(err => {

            if(err.errors) throw({ code: 422, message: `Unable to delete ${options.name}`, data: err.toJSON() })

            throw(err)
        })

    }

    const responder = (req, res, next) => {

        succeed(res, 200, `Successfully deleted ${options.name}`)

    }

    const logger = resourceLogger('deleted {object1}')

    return { processor, responder, logger }

}
