import { succeed, fail } from 'platform/utils/responses'
import allowedParams from 'platform/utils/allowed_params'

export default (options) => {

  return (req, res, next) => {

    let data = options.allowedParams ? allowedParams(req.body, options.allowedParams) : {}

    if(options.ownedByUser) {
      data.user_id = req.user.get('id')
    }

    options.model.forge(data).save().then(record => {

      const data = options.serializer ? options.serializer(record) : record.toJSON()

      succeed(res, 201, `Successfully created ${options.name}`, data)

      next()

    }).catch(err => {

      if(err.errors) {
        return fail(res, 422, `Unable to create ${options.name}`, err.toJSON())
      }

      next(err)

    })
  }

}
