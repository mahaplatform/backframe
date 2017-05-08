import _ from 'lodash'
import { mergeTypes } from '../../utils/core'
import { validateOptions, defaultOptions } from '../../utils/options'
import * as constants from '../../constants'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = mergeTypes({
      after: { type: ['function','function[]'], required: false },
      alterRequest: { type: ['function','function[]'], required: false },
      before: { type: ['function','function[]'], required: false },
      name: { type: 'string', required: true },
      processor: { type: 'function', required: false },
      renderer: { type: 'function', required: false },
      responder: { type: 'function', required: false },
      serializer: { type: 'function', required: false }
    }, backframeOptions.plugins)

    validateOptions('queue', userOptions, TYPES)

    const options = normalizeOptions(userOptions, TYPES)

    return buildQueue(options)

  }

}

// normalize and merge defaut options
export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }

}

export const buildQueue = (options) => {

  return {
    options: _.omit(options, constants.BACKFRAME_LIFECYCLE),
    handler: _.pick(options, constants.BACKFRAME_LIFECYCLE)
  }

}
