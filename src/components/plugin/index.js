import { validateOptions, defaultOptions } from '../../utils/options'

export default (userOptions = {}) => {

  const TYPES = {
    name: { type: 'string', required: true },
    options: { type: 'object', required: false, default: [] },
    alterRequest: { type: ['function','function[]'], required: false },
    alterRecord: { type: ['function','function[]'], required: false },
    before: { type: ['function','function[]'], required: false },
    defaultQuery: { type: ['function','function[]'], required: false },
    processor: { type: 'function', required: false },
    renderer: { type: 'function', required: false },
    responder: { type: 'function', required: false }
  }

  validateOptions('plugin', userOptions, TYPES)

  return normalizeOptions(userOptions, TYPES)

}

export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }
}
