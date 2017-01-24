import { succeed, fail } from 'platform/utils/responses'

export default (options) => {

  return (req, res, next) => {

    req[options.name].destroy().then(record => {

      succeed(res, 204, `Successfully updated ${options.name}`)

      next()

    }).catch(err => {

      if(err.errors) {
        return fail(res, 422, `Unable to update ${options.name}`, err.toJSON())
      }

      next(err)

    })
  }

}
