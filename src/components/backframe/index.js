import { validateOptions } from '../../utils/options'
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
    knex: { type: 'object', required: true },
    redis: { type: 'object', required: false },
    plugins: { type: 'object[]', required: false, default: [] }
  }

  validateOptions('backframe', userOptions, TYPES)

  return {
    handler: handler(userOptions),
    queue: queue(userOptions),
    route: route(userOptions),
    resources: resources(userOptions),
    router: router(userOptions),
    segment: segment(userOptions),
    table: table(userOptions),
    worker: worker(userOptions)
  }

}
