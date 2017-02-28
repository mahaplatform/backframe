import passport from 'platform/services/passport'
import App from 'platform/models/app'
import Right from 'platform/models/right'

export default (req, res, next) => {

  return new Promise((resolve, reject) => {

    passport('user_id').authenticate('jwt', { session: false }, (err, user, info) => {

      if(err) {
        return reject({ code: 401, message: 'Unable to find user'  })
      }

      if(!user) {
        return reject({ code: 401, message: info.message })
      }

      req.jwt = info
      req.team = user.related('team')
      req.user = user

      resolve(user)

    })(req, res, next)

  }).then(user => {

    const apps = () => App.query(qb => qb.innerJoin('roles_apps', 'roles_apps.app_id', 'apps.id')
       .innerJoin('users_roles', 'users_roles.role_id', 'roles_apps.role_id')
       .where('users_roles.user_id', '=', req.user.get('id')).groupBy('apps.id')).fetchAll()

    const rights = () => Right.query(qb => qb.innerJoin('roles_rights', 'roles_rights.right_id', 'rights.id')
       .innerJoin('users_roles', 'users_roles.role_id', 'roles_rights.role_id')
       .where('users_roles.user_id', '=', req.user.get('id')).groupBy('rights.id')).fetchAll({ withRelated: ['app']})

    return Promise.all([apps(), rights()]).then(results => {

      req.apps = results[0].map(app => app.get('title').toLowerCase())
      req.rights = results[1].map(right => right.get('code'))

      next()

      return null

    }).catch(err => {

      console.log(err)

    })

  })

}
