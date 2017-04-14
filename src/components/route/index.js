import _ from 'lodash'
import { mergeTypes } from '../../utils/core'
import { validateOptions, defaultOptions } from '../../utils/options'
import * as constants from '../../constants'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = mergeTypes({
      afterHooks: { type: ['function','function[]'], required: false },
      alterRequest: { type: ['function','function[]'], required: false },
      beforeHooks: { type: ['function','function[]'], required: false },
      beginHooks: { type: ['function','function[]'], required: false },
      cacheFor: { type: 'integer', required: false },
      commitHooks: { type: ['function','function[]'], required: false },
      handler: { type: 'function', required: false },
      method: { type: 'string', required: true, default: 'get' },
      path: { type: 'string', required: true },
      processor: { type: 'function', required: false },
      renderer: { type: 'function', required: false },
      responder: { type: 'function', required: false },
      serializer: { type: 'function', required: false }
    }, backframeOptions.plugins)

    validateOptions('route', userOptions, TYPES)

    const options = normalizeOptions(userOptions, TYPES)

    return buildRoute(options)

  }

}

// normalize and merge defaut options
export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }

}

// convert options into route fomat { method, path, options, handler]}
export const buildRoute = (options) => {

  return {
    method: options.method,
    path: options.path,
    options: _.omit(options, [...constants.BACKFRAME_LIFECYCLE,'method','path']),
    handler: options.handler || _.pick(options, constants.BACKFRAME_LIFECYCLE)
  }

}
