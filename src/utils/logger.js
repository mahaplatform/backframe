import _ from 'lodash'
import chalk from 'chalk'
import moment from 'moment'

let queries = []

let started = null

let ticks = []

let startTime = null

const startQuery = query => {
  startTime = process.hrtime()
  queries.push(query)
}

const endQuery = (response, query) => {
  if(!query.__knexQueryUid) return
  const diff = process.hrtime(startTime)
  const ms = diff[0] * 1e3 + diff[1] * 1e-6
  const index = _.findIndex(queries, { __knexQueryUid: query.__knexQueryUid } )
  queries[index].duration = ms.toFixed(3)
}

export const beginLogger = options => () => {

  queries = []

  ticks = []

  started = moment()

  options.knex.client.on('query', startQuery).on('query-response', endQuery)

}

export const endLogger = options => () => {

  options.knex.client.removeListener('query', startQuery).removeListener('query-response', endQuery)

}

export const recordTick = (event) => {

  if(process.env.NODE_ENV !== 'development') return true

  const timestamp = moment()

  ticks.push({ event, timestamp })

}

export const expandBenchmark = (ticks) => {

  let pointer = started

  return ticks.map(tick => {

    const duration = tick.timestamp.diff(pointer, 'milliseconds')

    pointer = tick.timestamp

    return `${tick.event}: ${duration}ms`

  }).join(', ')

}

export const printLogger = options => (req, res, result) => {

  const extra = options.log ? options.log(req) : {}

  console.log('=========================================================')
  console.log('%s %s', chalk.red(req.method), req.path)
  console.log('=========================================================')
  if(!_.isEmpty(req.params)) console.log('%s %s', chalk.red('PARAMS:'), JSON.stringify(req.params))
  if(!_.isEmpty(req.body)) console.log('%s %s', chalk.red('BODY:'), JSON.stringify(req.body))
  if(!_.isEmpty(req.query))  console.log('%s %s', chalk.red('QUERY:'), JSON.stringify(req.query))
  Object.keys(extra).map(key => {
    console.log('%s %s', chalk.red(`${key.toUpperCase()}:`), JSON.stringify(extra[key]))
  })
  queries.forEach(query => {
    const duration = query.duration ? chalk.grey(`${query.duration}ms`) : ''
    console.log('%s %s %s %s', chalk.green('SQL:'), query.sql, query.bindings ? chalk.magenta(`{${query.bindings.join(', ')}}`) : '', duration)
  })
  if(result && result.errors) console.log('%s %s', chalk.red('ERRORS:'), JSON.stringify(result.errors))
  if(!_.isEmpty(ticks)) console.log('%s %s', chalk.red(`BENCHMERK:`), expandBenchmark(ticks))
  console.log('%s %s rendered in %sms', chalk.red('RESPONSE:'), res.statusCode, moment().diff(started, 'milliseconds'))
  console.log('=========================================================')
  console.log('')
}

export const printQueue = options => (job, result) => {

  console.log(result)

  console.log('=========================================================')
  console.log('%s %s', chalk.red('QUEUE:'), options.name)
  console.log('=========================================================')
  if(!_.isEmpty(job)) console.log('%s %s', chalk.red('DATA:'), JSON.stringify(job.data))
  queries.forEach(query => {
    const duration = query.duration ? chalk.grey(`${query.duration}ms`) : ''
    console.log('%s %s %s %s', chalk.green('SQL:'), query.sql, query.bindings ? chalk.magenta(`{${query.bindings.join(', ')}}`) : '', duration)
  })
  if(result && result.errors) console.log('%s %s', chalk.red('ERRORS:'), JSON.stringify(result.errors))
  if(result) console.log('%s %s', chalk.red('RESULT:'), JSON.stringify(result))
  if(!_.isEmpty(ticks)) console.log('%s %s', chalk.red(`BENCHMERK:`), expandBenchmark(ticks))
  console.log('%s rendered in %sms', chalk.red('RESPONSE:'), moment().diff(started, 'milliseconds'))
  console.log('=========================================================')
  console.log('')
}
