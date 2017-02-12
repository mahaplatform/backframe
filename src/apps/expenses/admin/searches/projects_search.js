import Promise from 'bluebird'
import ProjectQuery from '../queries/project_query'
import Project from '../models/project'

export default filters => {
  return new Promise((resolve, reject) => {
    Project.query(qb => {
      qb = ProjectQuery(qb, filters)
    }).fetchAll().then(results => {
      const json = results.map(result => ({
        text: result.get('title'),
        subtext: null,
        photo: null,
        route: `/admin/expenses/projects/${result.get('id')}`
      }))
      resolve(json)
    }).catch(err => {
      reject(err)
    })
  })
}
