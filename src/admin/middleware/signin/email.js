import Checkit from 'checkit'
import User from 'platform/models/user'
import { succeed } from 'platform/utils/responses'

export default (req, res, next) => {

    Checkit({
        team_id: 'required',
        email: 'required'
    }).run(req.query).then(fields => {

        return User.where({ team_id: req.query.team_id, email: req.query.email }).fetch({ withRelated: ['photo'] }).then(user => {

            if(!user) {
                return next({ code: 404, message: 'Unable to find this user'})
            }

            const data = {
                id: user.get('id'),
                full_name: user.get('full_name'),
                email: user.get('email'),
                photo: user.related('photo').get('url')
            }

            succeed(res, 200, '', { data })

        }).catch(next)

    }).catch(err => {

        return next({ code: 422, message: 'Unable to complete request', data: err.toJSON() })

    })

}
