import { validateOptions, defaultOptions } from '../../utils/options'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = {
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

}
