import _ from 'lodash'
import { defaultResponder } from '../../utils'
import { mergeTypes } from '../../utils/core'
import { validateOptions, defaultOptions } from '../../utils/options'
import * as constants from '../../constants'

export default (backframeOptions = {}) => (userOptions = {}) => {

  const TYPES = mergeTypes({
    action: { type: 'string', required: false },
    afterCommit: { type: ['function','function[]'], required: false },
    afterProcessor: { type: ['function','function[]'], required: false },
    alterRequest: { type: ['function','function[]'], required: false },
    alterRecord: { type: ['function','function[]'], required: false },
    beforeProcessor: { type: ['function','function[]'], required: false },
    beforeRollback: { type: ['function','function[]'], required: false },
    cacheFor: { type: 'integer', required: false },
    handler: { type: 'function', required: false },
    method: { type: 'string', required: true, default: 'get' },
    path: { type: 'string', required: true },
    processor: { type: 'function', required: false },
    renderer: { type: 'function', required: false },
    responder: { type: 'function', required: false },
    serializer: { type: 'function', required: false }
  }, backframeOptions.plugins)

  validateOptions('route', userOptions, TYPES)

  const mergedOptions = {
    ..._.pick(backframeOptions, ['defaultFormat','knex']),
    ...userOptions
  }

  const options = normalizeOptions(mergedOptions, TYPES)

  return buildRoute(options)

}

// normalize and merge defaut options
export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    responder: defaultResponder('Success'),
    ...userOptions
  }

}

// convert options into route fomat { method, path, options, handler]}
export const buildRoute = (options) => {

  return {
    method: options.method,
    path: options.path,
    options: _.omit(options, [...constants.BACKFRAME_LIFECYCLE, 'method', 'path']),
    handler: options.handler || _.pick(options, constants.BACKFRAME_LIFECYCLE)
  }

}
