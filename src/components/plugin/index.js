import { validateOptions, defaultOptions } from '../../utils/options'

export default (userOptions = {}) => {

  const TYPES = {
    afterCommit: { type: ['function','function[]'], required: false },
    afterProcessor: { type: ['function','function[]'], required: false },
    alterRequest: { type: ['function','function[]'], required: false },
    alterRecord: { type: ['function','function[]'], required: false },
    beforeProcessor: { type: ['function','function[]'], required: false },
    beforeRollback: { type: ['function','function[]'], required: false },
    defaultQuery: { type: ['function','function[]'], required: false },
    name: { type: 'string', required: true },
    options: { type: 'object', required: false, default: [] },
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
