import App from 'platform/models/app'
import Right from 'platform/models/right'
import knex from 'platform/services/knex'

export default (req, res, next) => {

  const apps = App.query(qb => qb
    .select(knex.raw('distinct on (apps.id) apps.*, users_roles.id is not null as installed'))
    .leftJoin('roles_apps', 'roles_apps.app_id', 'apps.id')
    .leftJoin('users_roles', function() {
      this.on('users_roles.role_id', '=', 'roles_apps.role_id')
        .andOn('users_roles.user_id','=',req.user.get('id'))
    })
    .orderBy('apps.id')
  ).fetchAll()

  const rights = Right.query(qb => qb
    .select(knex.raw('distinct on (rights.id) rights.*, users_roles.id is not null as assigned'))
    .leftJoin('roles_rights', 'roles_rights.right_id', 'rights.id')
    .leftJoin('users_roles', function() {
      this.on('users_roles.role_id', '=', 'roles_rights.role_id')
        .andOn('users_roles.user_id','=',req.user.get('id'))
    })
    .orderBy('rights.id')
  ).fetchAll()

  Promise.all([apps, rights]).then(results => {

    const rights = results[1].reduce((rights, right) => {
      if(!rights[right.get('app_id')]) {
        rights[right.get('app_id')] = []
      }
      rights[right.get('app_id')].push({
        id: right.get('id'),
        text: right.get('text'),
        description: right.get('description'),
        assigned: right.get('assigned')
      })
      return rights
    }, {})

    const access = results[0].map(app => {
      return {
        id: app.get('id'),
        title: app.get('title'),
        installed: app.get('installed'),
        rights: rights[app.get('id')] || []
      }
    })

    res.status(200).json(access)

    next()

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

}
