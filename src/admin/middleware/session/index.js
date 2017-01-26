import Promise from 'bluebird'
import App from 'platform/models/app'
import Right from 'platform/models/right'
import glob from 'glob'
import path from 'path'
import { succeed } from 'platform/utils/responses'

export default (req, res, next) => {

  const files = glob.sync(path.resolve(__dirname, '../../../../**/navigation.js'))
  let navigation = {}
  files.map(file => {
    const matches = file.match(/\/([a-z_]*)\/admin\/navigation\.js/)
    if(matches) navigation[matches[1]] = require(file)
  })

  const apps = App.query(qb => qb.innerJoin('roles_apps', 'roles_apps.app_id', 'apps.id')
     .innerJoin('users_roles', 'users_roles.role_id', 'roles_apps.role_id')
     .where('users_roles.user_id', '=', req.user.get('id')).groupBy('apps.id')).fetchAll()

  const rights = Right.query(qb => qb.innerJoin('roles_rights', 'roles_rights.right_id', 'rights.id')
     .innerJoin('users_roles', 'users_roles.role_id', 'roles_rights.role_id')
     .where('users_roles.user_id', '=', req.user.get('id')).groupBy('rights.id')).fetchAll()

  return Promise.all([apps, rights]).then(results => {

    const apps = results[0].reduce((menu, app) => {
      const nav = navigation[app.get('title').toLowerCase()]
      if(nav) menu.push(nav)
      return menu
    }, [])

    const rights = results[1].map(right => right.get('text'))

    const data = {
      apps,
      user: {
        name: req.user.get('full_name'),
        initials: req.user.get('initials'),
        email: req.user.get('email'),
        photo: req.user.related('photo').get('url'),
        unread: Math.floor((Math.random() * 20) + 1),
        rights
      }
    }

    succeed(res, 200, '', data)

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

}
