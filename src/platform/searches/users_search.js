import Promise from 'bluebird'
import UserQuery from '../queries/user_query'
import User from '../models/user'

export default filters => {
  return new Promise((resolve, reject) => {
    User.query(qb => {
      qb = UserQuery(qb, filters)
    }).fetchAll().then(results => {
      const json = results.map(result => ({
        text: result.get('full_name'),
        subtext: result.get('email'),
        photo: result.related('photo').get('url'),
        route: `/admin/team/users/${result.get('id')}`
      }))
      resolve(json)
    }).catch(err => {
      reject(err)
    })
  })
}
