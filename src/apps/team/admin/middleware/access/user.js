import App from 'platform/models/app'
import Right from 'platform/models/right'
import knex from 'platform/services/knex'
import { succeed } from 'platform/utils/responses'

export default (req, res, next) => {

  const apps = App.query(qb => qb
    .select(knex.raw('distinct on (apps.id) apps.*, users_roles.id is not null as installed'))
    .leftJoin('roles_apps', 'roles_apps.app_id', 'apps.id')
    .joinRaw('left join users_roles on users_roles.role_id=roles_apps.role_id and users_roles.user_id=?', req.params.id)
    .orderBy('apps.id')
  ).fetchAll()

  const rights = Right.query(qb => qb
    .select(knex.raw('distinct on (rights.id) rights.*, users_roles.id is not null as assigned'))
    .leftJoin('roles_rights', 'roles_rights.right_id', 'rights.id')
    .joinRaw('left join users_roles on users_roles.role_id=roles_rights.role_id and users_roles.user_id=?', req.params.id)
    .orderByRaw('rights.id asc, users_roles.id asc')
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

    const data = results[0].map(app => {
      return {
        id: app.get('id'),
        title: app.get('title'),
        installed: app.get('installed'),
        rights: rights[app.get('id')] || []
      }
    })

    succeed(res, 200, '', { data })

    next()

  }).catch(err => {

    return next({ code: 500, message: err.message })

  })

}
