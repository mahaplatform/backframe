import { coerceArray, defaultQuery } from '../utils'

export default (action, options) => {

  return req => {

    const withRelated = options.withRelated[action] || options.withRelated.all

    const fetchOptions = withRelated ? { withRelated: coerceArray(withRelated) } : {}

    const tableName = options.model.extend().__super__.tableName

    return options.model.query(qb => {

      qb = defaultQuery(req, options, action, qb, {})

      qb.where(`${tableName}.id`, req.params[options.primaryKey])

    }).fetch(fetchOptions).then(record => {

      if(!record) {
        throw new Error({ code: 404, message: `Unable to find ${options.name}` })
      }

      return record

    })

  }

}
