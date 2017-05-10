import { coerceArray, defaultQuery } from '../utils'
import BackframeError from '../utils/error'

export default options => async (req, trx) => {

  const tableName = options.model.extend().__super__.tableName

  const fetchOptions = options.withRelated ? { withRelated: coerceArray(options.withRelated), transacting: trx } : { transacting: trx }

  const query = qb => {

    qb = defaultQuery(options)(req, trx, qb)

    qb.where(`${tableName}.id`, req.params.id)

  }

  const record = await options.model.query(query).fetch(fetchOptions)

  if(!record) {
    throw new BackframeError({ code: 404, message: `Unable to find ${options.name}` })
  }

  return record

}
