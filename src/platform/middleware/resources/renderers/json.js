import Promise from 'bluebird'
import pluralize from 'pluralize'
import { succeed } from 'platform/utils/responses'

export default (all, total, limit, skip, records, options, req, res, next) => {

  return new Promise((resolve, reject) => {

    const data = (req.query.$skip || req.query.$limit) ? {
      all,
      total,
      limit,
      skip,
      records
    } : {
      all,
      total,
      records
    }

    succeed(res, 200, `Sucessfully found ${pluralize(options.name)}`, data)

    next()

    resolve()

  })

}
