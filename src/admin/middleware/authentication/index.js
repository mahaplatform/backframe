import passport from 'platform/services/passport'
import Error from 'platform/utils/error'

export default (req, res, next) => {

  return passport('user_id').authenticate('jwt', { session: false }, (err, user, info) => {

    if(err) {
      const error = new Error({ code: 401, message: 'Unable to find user' })
      return next(error)
    }

    if(!user) {
      const error = new Error({ code: 401, message: info.message })
      return next(error)
    }

    req.user = user
    req.jwt = info

    next()

    return null

  })(req, res, next)

}
