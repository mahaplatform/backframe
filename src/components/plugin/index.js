import { validateOptions } from '../../utils/options'

export default (userOptions = {}) => {

  const TYPES = {
    name: { type: 'string', required: true },
    options: { type: 'object', required: false },
    alterRequest: { type: ['function','function[]'], required: false },
    alterRecord: { type: ['function','function[]'], required: false },
    beforeHooks: { type: ['function','function[]'], required: false },
    processor: { type: 'function', required: false },
    renderer: { type: 'function', required: false },
    responder: { type: 'function', required: false }
  }

  validateOptions('plugin', userOptions, TYPES)

  return userOptions

}
