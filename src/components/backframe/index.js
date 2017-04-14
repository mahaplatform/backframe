import { validateOptions } from '../../utils/options'
import handler from '../handler'
import route from '../route'
import resources from '../resources'
import router from '../router'
import segment from '../segment'
import table from '../table'

export default (userOptions = {}) => {

  const TYPES = {
    knex: { type: 'object', required: true },
    redis: { type: 'object', required: false },
    plugins: { type: 'object[]', required: false, default: [] }
  }

  validateOptions('backframe', userOptions, TYPES)

  return {
    handler: handler(userOptions),
    route: route(userOptions),
    resources: resources(userOptions),
    router: router(userOptions),
    segment: segment(userOptions),
    table: table(userOptions)
  }

}
