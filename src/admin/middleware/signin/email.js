import Checkit from 'checkit'
import User from 'platform/models/user'
import { succeed, fail } from 'platform/utils/responses'

export default (req, res, next) => {

  const rules = {
    team_id: 'required',
    email: 'required'
  }

  Checkit(rules).run(req.query).then(fields => {

    User.where({ team_id: req.query.team_id, email: req.query.email }).fetch({ withRelated: ['photo'] }).then(user => {

      if(!user) {
        return fail(res, 404, 'Unable to find this user')
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
