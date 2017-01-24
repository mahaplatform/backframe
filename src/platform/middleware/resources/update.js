import { succeed } from 'platform/utils/responses'
import Error from 'platform/utils/error'

export default (options) => {

  return (req, res, next) => {

    req[options.name].destroy().then(record => {

      succeed(res, 204, `Successfully updated ${options.name}`)

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
