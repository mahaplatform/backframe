import _ from 'lodash'
import chalk from 'chalk'
import moment from 'moment'

export class Logger {

  constructor() {
    this.log = []
  }

  start() {
    this.started = moment()
  }

  info(title, text) {
    this.write('info', title, text)
  }

  warning(title, text) {
    this.write('warning', title, text)
  }

  error(title, text) {
    this.write('error', title, text)
  }

  finish() {
    this.ended = moment()
  }

  write(type, title, text) {
    this.log = [
      ...this.log,
      { type, title, text }
    ]
  }

  read() {
    return this.log
  }

  duration() {
    return this.ended.diff(this.started, 'milliseconds')+'ms'
  }

}


export const loggerBegin = (req, res, next) => {

  req.logger = new Logger()

  req.logger.start()

  req.logger.info('REQUEST', `${req.method} ${req.path}`)

  if(!_.isEmpty(req.query)) {
    req.logger.info('QUERY', JSON.stringify(req.query))
  }

  if(!_.isEmpty(req.body)) {
    req.logger.info('BODY', JSON.stringify(req.body))
  }

  next()

}

export const loggerEnd = (req, res, next) => {

  req.logger.finish()

  req.logger.read().map(entry => {
    console.log(chalk.green(`${entry.title}: `) + entry.text)
  })

  console.log(`Rendered in ${req.logger.duration()}`)

  next()

}
