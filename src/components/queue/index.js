import { validateOptions, defaultOptions } from '../../utils/options'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = {
      handler: { type: 'function', required: true },
      name: { type: 'string', required: false }
    }

    validateOptions('handler', userOptions, TYPES)

    const options = normalizeOptions(userOptions, TYPES)

    return buildQueue(options)

  }

}

export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }

}

export const buildQueue = (options) => {
  return {
    name: options.name,
    handler: options.handler
  }
}
