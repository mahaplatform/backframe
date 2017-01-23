import _ from 'lodash'

export default (req, res, next) => {

  console.info(`\nREQUEST: ${req.method} ${req.path}`)

  if(!_.isEmpty(req.user)) {
    console.info(`USER: ${req.user.get('name')}`)
  }

  if(!_.isEmpty(req.query)) {
    console.info(`QUERY: ${JSON.stringify(req.query)}`)
  }

  if(!_.isEmpty(req.body)) {
    console.info(`BODY: ${JSON.stringify(req.body)}`)
  }

  next()

}
