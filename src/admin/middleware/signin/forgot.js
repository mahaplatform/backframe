import Checkit from 'checkit'
import jwt from 'platform/services/jwt'
import User from 'platform/models/user'
import { succeed } from 'platform/utils/responses'
import Error from 'platform/utils/error'

export default (req, res, next) => {

  Checkit({
    team_id: 'required',
    email: 'required'
  }).run(req.query).then(fields => {

    User.where({ email: req.body.email }).fetch().then(user => {

      if(!user) {
        const error = new Error({ code: 404, message: 'Unable to find this user'})
        return next(error)
      }

      const one_day = 60 * 60 * 24
      const token = jwt.encode({ reset_user_id: user.id }, one_day)

      // queue.createJob('send_reset_email', {
      //   from: 'notifier@cms.cce.cornell.edu',
      //   to: [req.body.email],
      //   subject: 'Your password reset',
      //   body: `Here is your password: <a href="${req.protocol}://${req.headers.host}/admin/reset/${token}">Reset Password</a>`
      // }).save()

      const data = { token }

      succeed(res, 200, '', data)

    })

  }).catch(err => {
    const error = new Error({ code: 422, message: 'Unable to complete request', data: err.toJSON() })
    return next(error)
  })

}
