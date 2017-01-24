import passport from 'platform/services/passport'
import { fail } from 'platform/utils/responses'

export default (req, res, next) => {

  return passport('user_id').authenticate('jwt', { session: false }, (err, user, info) => {

    if(err) {
      return fail(res, 401, 'Unable to find user')
    }

    if(!user) {
      return fail(res, 401, info.message)
    }

    req.user = user
    req.jwt = info

    next()

    return null

  })(req, res, next)

}
