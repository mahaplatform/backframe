import Checkit from 'checkit'
import jwt from 'platform/services/jwt'
import User from 'platform/models/user'
import { succeed } from 'platform/utils/responses'

export default (req, res, next) => {

    Checkit({
        team_id: 'required',
        email: 'required',
        password: 'required'
    }).run(req.body).then(fields => {

        return User.where({
            team_id: req.body.team_id,
            email: req.body.email
        }).fetch().then(user => {

            if(!user) {
                const error = new Error({ code: 404, message: 'Unable to find this user'})
                return next(error)
            }

            if(!user.authenticate(req.body.password)) {
                const error = new Error({ code: 404, message: 'Invalid password'})
                return next(error)
            }

            const two_weeks = 60 * 60 * 24 * 7 * 2
            const token = jwt.encode({ user_id: user.id }, two_weeks)
            const data = { token }

            succeed(res, 200, '', { data })

            next()

        }).catch(next)

    }).catch(err => {

        return next({ code: 422, message: 'Unable to complete request', data: err.toJSON() })

    })



}
