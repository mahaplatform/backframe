import Promise from 'bluebird'
import pluralize from 'pluralize'
import { succeed } from 'platform/utils/responses'

export default (all, total, limit, skip, data, options, req, res, next) => {

    return new Promise((resolve, reject) => {

        const extra = (req.query.$page) ? {
            pagination: {
                all,
                total,
                limit,
                skip
            },
            data
        } : {
            data
        }

        succeed(res, 200, `Sucessfully found ${pluralize(options.name)}`, extra)

        resolve()

    })

}
