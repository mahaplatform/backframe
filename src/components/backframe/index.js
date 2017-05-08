import environment from '../../services/environment'
import { validateOptions, defaultOptions } from '../../utils/options'
import handler from '../handler'
import route from '../route'
import resources from '../resources'
import router from '../router'
import segment from '../segment'
import table from '../table'

export default (userOptions = {}) => {

  const TYPES = {
    defaultLimit: { type: 'integer', required: false, default: 100 },
    defaultFormat: { type: 'string', required: false, default: 'json' },
    plugins: { type: 'object[]', required: false, default: [] }
  }

  validateOptions('backframe', userOptions, TYPES)

  const options = normalizeOptions(userOptions, TYPES)

  return {
    handler: handler(options),
    route: route(options),
    resources: resources(options),
    router: router(options),
    segment: segment(options),
    table: table(options)
  }

}

export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }

}
