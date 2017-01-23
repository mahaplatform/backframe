import { succeed, fail } from 'app/utils/responses'
import allowedParams from 'app/utils/allowed_params'

export default (options) => {

  return (req, res, next) => {

    let data = options.allowedParams ? allowedParams(req.body, options.allowedParams) : {}

    req[options.name].save(data, { patch: true }).then(record => {

      const data = options.serializer ? options.serializer(record) : record.toJSON()

      succeed(res, 200, `Successfully deleted ${options.name}`, data)

      next()

    }).catch(err => {

      if(err.errors) {
        return fail(res, 422, `Unable to deleted ${options.name}`, err.toJSON())
      }

      next(err)

    })
  }

}
