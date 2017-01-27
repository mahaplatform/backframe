import Promise from 'bluebird'
import path from 'path'
import glob from 'glob'
import { succeed } from 'platform/utils/responses'

export default (req, res, next) => {

  const files = glob.sync(path.resolve(__dirname, '../../../../**/searches/*_search.js'))

  let searches = {}
  files.map(filepath => {
    const matches = filepath.match(/([a-z]*)_search\.js/)
    if(matches) {
      const search = require(filepath).default
      searches[matches[1]] = search(req.query)
    }
  })

  const promises = Object.keys(searches).map(key => searches[key])
  Promise.all(promises).then(results => {

    const data = results.reduce((data, result, index) => {
      const key = Object.keys(searches)[index]
      if(result.length > 0) {
        data[key] = result
      }
      return data
    }, {})

    succeed(res, 200, '', data)

    next()

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

}
