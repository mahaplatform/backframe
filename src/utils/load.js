import { coerceArray, defaultQuery } from '../utils'

export default (options) => {

  const fetchOptions = options.withRelated ? { withRelated: coerceArray(options.withRelated) } : {}

  const tableName = options.model.extend().__super__.tableName

  return req => {

    return options.model.query(qb => {

      qb = defaultQuery(req, options, qb, {})

      qb.where(`${tableName}.id`, req.params.id)

    }).fetch(fetchOptions).then(record => {

      if(!record) {
        throw({ code: 404, message: `Unable to find ${options.name}` })
      }

      return record

    })

  }

}
