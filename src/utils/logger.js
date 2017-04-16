import Promise from 'bluebird'
import _ from 'lodash'
import chalk from 'chalk'
import moment from 'moment'

let queries = []

let started = null

let ticks = []

export const captureQueries = builder => {

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

export const beginLogger = options => () => {

  queries = []

  ticks = []

  started = moment()

  options.knex.client.on('start', captureQueries)

  return Promise.resolve()

}

export const endLogger = options => () => {

  options.knex.client.removeListener('start', captureQueries)

  return Promise.resolve()

}

export const recordTick = (event) => {

  if(process.env.NODE_ENV !== 'development') return Promise.resolve()

  const timestamp = moment()

  ticks.push({ event, timestamp })

  return Promise.resolve()

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
    console.log('%s %s %s %s', chalk.green('SQL:'), query.sql, chalk.magenta(`{${query.bindings.join(', ')}}`), chalk.grey(`${query.duration}ms`))
  })
  if(result && result.errors) console.log('%s %s', chalk.red('ERRORS:'), JSON.stringify(result.errors))
  if(!_.isEmpty(ticks)) console.log('%s %s', chalk.red(`BENCHMERK:`), expandBenchmark(ticks))
  console.log('%s %s rendered in %sms', chalk.red('RESPONSE:'), res.statusCode, moment().diff(started, 'milliseconds'))
  console.log('=========================================================')
  console.log('')
}
