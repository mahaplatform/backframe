import { coerceArray } from '../utils/core'
import { defaultQuery } from '../utils'
import BackframeError from '../utils/error'

const load = async (req, trx, options) => {

  const tableName = options.model.extend().__super__.tableName

  const fetchOptions = options.withRelated ? { withRelated: coerceArray(options.withRelated), transacting: trx } : { transacting: trx }

  const query = qb => {

    defaultQuery(req, trx, qb, options)

    qb.where(`${tableName}.${options.primaryKey}`, req.params[options.primaryKey])

  }

  const record = await options.model.query(query).fetch(fetchOptions)

  if(!record) {
    throw new BackframeError({ code: 404, message: `Unable to find ${options.name}` })
  }

  return record

}

export default load
