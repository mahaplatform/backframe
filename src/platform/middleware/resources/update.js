import { succeed } from 'platform/utils/responses'
import allowedParams from 'platform/utils/allowed_params'
import Error from 'platform/utils/error'

export default (options) => {

  return (req, res, next) => {

    let data = options.allowedParams ? allowedParams(req.body, options.allowedParams) : {}

    req.resource.save(data, { patch: true }).then(record => {

      const data = options.serializer ? options.serializer(record) : record.toJSON()

      succeed(res, 200, `Successfully updated ${options.name}`, data)

      next()

    }).catch(err => {

      if(err.errors) {
        const error = new Error({ code: 422, message: `Unable to update ${options.name}`, data: err.toJSON() })
        return next(error)
      }

      next(err)

    })
  }

}
