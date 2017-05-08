import { validateOptions, defaultOptions } from '../../utils/options'
import handler from '../handler'
import queue from '../queue'
import route from '../route'
import resources from '../resources'
import router from '../router'
import segment from '../segment'
import table from '../table'
import worker from '../worker'

export default (userOptions = {}) => {

  const TYPES = {
    defaultLimit: { type: 'integer', required: false, default: 100 },
    defaultFormat: { type: 'string', required: false, default: 'json' },
    knex: { type: 'object', required: true },
    plugins: { type: 'object[]', required: false, default: [] },
    redis: { type: 'object', required: false }
  }

  validateOptions('backframe', userOptions, TYPES)

  const options = normalizeOptions(userOptions, TYPES)

  return {
    queue: queue(options),
    route: route(options),
    resources: resources(options),
    router: router(options),
    segment: segment(options),
    table: table(options),
    worker: worker(options)
  }

}

export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }

}
