import { coerceArray, defaultQuery } from '../utils'
import BackframeError from '../utils/error'

export default (options) => {

  const tableName = options.model.extend().__super__.tableName

  return (req, trx) => {

    const fetchOptions = options.withRelated ? { withRelated: coerceArray(options.withRelated), transacting: trx } : { transacting: trx }

    return options.model.query(qb => {

      qb = defaultQuery(req, options, qb, {})

      qb.where(`${tableName}.id`, req.params.id)

    }).fetch(fetchOptions).then(record => {

      if(!record) {
        throw new BackframeError({ code: 404, message: `Unable to find ${options.name}` })
      }

      return record

    })

  }

}
