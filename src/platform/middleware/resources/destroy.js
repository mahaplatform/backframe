import { succeed } from 'platform/utils/responses'
import Error from 'platform/utils/error'

export default (options) => {

  return (req, res, next) => {

    req.resource.destroy().then(record => {

      succeed(res, 204, `Successfully deeted ${options.name}`)

      next()

    }).catch(err => {

      if(err.errors) {
        const error = new Error({ code: 422, message: `Unable to delete ${options.name}`, data: err.toJSON() })
        return next(error)
      }

      next(err)

    })
  }

}
