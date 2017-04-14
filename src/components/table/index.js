import chalk from 'chalk'
import { validateOptions, defaultOptions } from '../../utils/options'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = {
      method: { type: 'string', required: false, default: 'all' },
      routes: { type: 'object[]', required: false, default: [] }
    }

    validateOptions('table', userOptions, TYPES)

    const options = normalizeOptions(userOptions, TYPES)

    return buildRoutingTable(options)

  }

}

export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }

}

export const padString = (text, length) => {

  return text + '                                                                                       '.slice(0, length - text.length)

}

export const buildRoutingTable = (options) => {

  const lines = [
    chalk.grey(' ======================================================================='),
    chalk.grey('|')+' '+chalk.white(padString('METHOD', 6))+' '+chalk.grey('|')+' '+chalk.white(padString('PATH', 60))+' '+chalk.grey('|'),
    chalk.grey('|=======================================================================|'),
    ...options.routes.reduce((lines,route) => {
      if(options.method !== 'all' && options.method !== route.method) return lines
      return [
        ...lines,
        chalk.grey('|')+' '+chalk.green(padString(route.method.toUpperCase(), 6))+' '+chalk.grey('|')+' '+chalk.white(padString(route.path, 60))+' '+chalk.grey('|')
      ]
    }, []),
    chalk.grey(' =======================================================================')
  ]

  return lines.join("\n") + "\n"

}
