import chalk from 'chalk'
import _ from 'lodash'

class Reporter {

  render(data) {
    this._writeKeyValue('REQUEST', `${data.method} ${data.url}`)
    this._writeKeyValue('HOST', data.hostname)
    if(!_.isEmpty(data.params)) this._writeKeyValue('PARAMS', JSON.stringify(data.params))
    if(!_.isEmpty(data.query))  this._writeKeyValue('QUERY', JSON.stringify(data.query))
    if(!_.isEmpty(data.body))   this._writeKeyValue('BODY', JSON.stringify(data.body))
    this._writeKeyValue('RESPONSE', `${data.status} in ${data.duration} ms`)
    data.log.map(entry => {
      process.stdout.write(chalk.green('SQL: ') + chalk.hex('#DDDDDD')(entry.sql) + chalk.magenta(` {${entry.bindings.join(', ')}} `) + entry.duration + 'ms\n')
    })
    process.stdout.write('\n')
  }

  _writeKeyValue(key, value) {
    process.stdout.write(chalk.red(_.padEnd(`${key}: `, 10)) + chalk.white(value) + '\n')
  }

}

export default Reporter
