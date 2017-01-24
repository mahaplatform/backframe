import _ from 'lodash'

export class Logger {

  constructor() {
    this.log = []
  }

  info(text) {
    this.write('info', text)
  }

  warning(text) {
    this.write('warning', text)
  }

  error(text) {
    this.write('error', text)
  }

  write(type, text) {
    this.log = [
      ...this.log,
      { [type]: text }
    ]
  }

  read() {
    return this.log
  }

}


export const loggerBegin = (req, res, next) => {

  console.log('begin')

  req.logger = new Logger()

  req.logger.info(`\nREQUEST: ${req.method} ${req.path}`)

  if(!_.isEmpty(req.user)) {
    req.logger.info(`USER: ${req.user.get('name')}`)
  }

  if(!_.isEmpty(req.query)) {
    req.logger.info(`QUERY: ${JSON.stringify(req.query)}`)
  }

  if(!_.isEmpty(req.body)) {
    req.logger.info(`BODY: ${JSON.stringify(req.body)}`)
  }

  next()

}

export const loggerEnd = (req, res, next) => {
  console.log('end')


  console.log(req.logger.read())

  next()

}
