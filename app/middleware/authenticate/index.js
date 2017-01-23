import User from 'app/models/user'
import { fail } from 'app/utils/responses'

export default (req, res, next) => {

  User.where({ id: 1 }).fetch().then(user => {

    if(!user) {
      return fail(res, 401, 'Unable to find user')
    }

    req.user = user
    next()

    return null

  }).catch(next)

}
