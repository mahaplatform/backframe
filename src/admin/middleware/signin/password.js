import Checkit from 'checkit'
import jwt from 'platform/services/jwt'
import User from 'platform/models/user'
import { succeed, fail } from 'platform/utils/responses'

export default (req, res, next) => {

  const rules = {
    team_id: 'required',
    email: 'required',
    password: 'required'
  }

  Checkit(rules).run(req.body).then(fields => {

    User.where({ team_id: req.body.team_id, email: req.body.email }).fetch().then(user => {

      if(!user) {
        return fail(res, 404, 'Unable to find this user')
      }

      if(!user.authenticate(req.body.password)) {
        return fail(res, 404, 'Invalid password')
      }

      const two_weeks = 60 * 60 * 24 * 7 * 2
      const token = jwt.encode({ user_id: user.id }, two_weeks)
      const data = { token }

      succeed(res, 200, '', data)

    }).catch(next)

    User.where({ team_id: req.query.team_id, email: req.query.email }).fetch({ withRelated: ['photo'] }).then(user => {

      if(!user) {
        const error = new Error({ code: 404, message: 'Unable to find this user' })
        return next(error)
      }

      const data = {
        id: user.get('id'),
        full_name: user.get('full_name'),
        email: user.get('email'),
        photo: user.related('photo').get('url')
      }

      succeed(res, 200, '', data)

    }).catch(next)


  }).caught(Checkit.Error, errors => {
    fail(res, 404, 'There were problems with your input', errors)
  })



}
