import _ from 'lodash'
import chalk from 'chalk'
import moment from 'moment'
import knex from 'platform/services/knex'

export class Logger {

  constructor() {
    this.log = []
  }

  start() {
    this.started = moment()
  }

  info(title, text, extra = null) {
    this.write('info', title, text, extra)
  }

  warning(title, text, extra = null) {
    this.write('warning', title, text, extra)
  }

  error(title, text, extra = null) {
    this.write('error', title, text, extra)
  }

  finish() {
    this.ended = moment()
  }

  write(type, title, text, extra) {
    this.log = [
      ...this.log,
      { type, title, text, extra }
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

  if(!_.isEmpty(req.query)) {
    req.logger.info('QUERY', JSON.stringify(req.query))
  }

  if(!_.isEmpty(req.body)) {
    req.logger.info('BODY', JSON.stringify(req.body))
  }



  let queries = []

  const captureQueries = builder => {

    var startTime = process.hrtime()
    var group = []

    builder.on('query', query => {
      group.push(query)
      queries.push(query)
    })

    builder.on('end', () => {
      const diff = process.hrtime(startTime)
      const ms = diff[0] * 1e3 + diff[1] * 1e-6
      group.forEach(query => {
        query.duration = ms.toFixed(3)
      })
    })

  }

  const logQueries = () => {
    res.removeListener('finish', logQueries)
    res.removeListener('close', logQueries)
    knex.client.removeListener('start', captureQueries)

    queries.forEach(function(query) {
      req.logger.info('SQL', `${query.sql} {${query.bindings.join(', ')}}`, `${query.duration}ms`)
    })
  }

  knex.client.on('start', captureQueries)
  res.on('finish', logQueries)
  res.on('close', logQueries)

  next()

}

export const loggerEnd = (req, res, next) => {

  req.logger.finish()

  console.log('----------------------------------------------------------------------------------------')
  console.log(`${req.method} ${req.path}`)
  console.log('----------------------------------------------------------------------------------------')

  req.logger.read().map(entry => {

    if(entry.extra) {
      console.log('%s %s %s', chalk.green(`${entry.title}: `), chalk.white(entry.text), chalk.grey(entry.extra))
    } else {
      console.log('%s %s', chalk.green(`${entry.title}: `), chalk.white(entry.text))
    }

  })

  console.log(`Rendered in ${req.logger.duration()}`)

  next()

}
