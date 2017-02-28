import knex from 'platform/services/knex'
import passport from 'platform/services/passport'
import Installation from 'platform/models/installation'
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

    const apps = () => Installation.query(qb => qb
      .select(knex.raw('distinct on (installations.app_id) installations.*'))
      .innerJoin('roles_apps', 'roles_apps.app_id', 'installations.app_id')
      .innerJoin('users_roles', 'users_roles.role_id', 'roles_apps.role_id')
      .where('users_roles.user_id', '=', req.user.get('id'))).fetchAll({ withRelated: ['app'] })

    const rights = () => Right.query(qb => qb
      .select(knex.raw('distinct on (rights.id) rights.*'))
      .innerJoin('roles_rights', 'roles_rights.right_id', 'rights.id')
      .innerJoin('users_roles', 'users_roles.role_id', 'roles_rights.role_id')
      .where('users_roles.user_id', '=', req.user.get('id'))).fetchAll({ withRelated: ['app'] })

    return Promise.all([apps(), rights()]).then(results => {

      req.apps = results[0].reduce((apps, installation) => {
        return {
          ...apps,
          [installation.related('app').get('title').toLowerCase()]: installation.get('settings')
        }
      }, {})

      req.rights = results[1].map(right => right.get('code'))

      next()

      return null

    }).catch(err => {

      console.log(err)

    })

  })

}
