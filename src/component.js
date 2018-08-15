import reserved from './utils/reserved'
import hooks from './utils/hooks'
import _ from 'lodash'

class Component {

  hooks = {
    afterCommit: [],
    afterProcessor: [],
    alterRecord: [],
    alterRequest: [],
    beforeCommit: [],
    beforeProcessor: [],
    beforeRollback: []
  }

  customOptions = null

  path = null

  constructor(config = {}) {
    if(config.afterCommit) this.setHooks('afterCommit', config.afterCommit)
    if(config.afterProcessor) this.setHooks('afterProcessor', config.afterProcessor)
    if(config.alterRecord) this.setHooks('alterRecord', config.alterRecord)
    if(config.alterRequest) this.setHooks('alterRequest', config.alterRequest)
    if(config.beforeCommit) this.setHooks('beforeCommit', config.beforeCommit)
    if(config.beforeProcessor) this.setHooks('beforeProcessor', config.beforeProcessor)
    if(config.beforeRollback) this.setHooks('beforeRollback', config.beforeRollback)
    if(config.path) this.setPath(config.path)
    this._setCustomOptions(config)
  }

  setHooks(ev, hooks) {
    this.hooks[ev] = _.castArray(hooks)
  }

  addHook(ev, hook) {
    this.hooks[ev] = [
      ...this.hooks[ev] || [],
      ..._.castArray(hook)
    ]
  }

  setPath(path) {
    this.path = path
  }

  _addItem(type, item) {
    this[type] = [
      ...this[type] || [],
      ..._.castArray(item)
    ]
  }

  _setCustomOptions(options) {
    this.customOptions = {
      ...this.customOptions || {},
      ..._.omit(options, reserved)
    }
  }

  _mergePaths(first, second) {

    return `${first || ''}${second || ''}`

  }

  _mergeOptions(first, second = {}, third = {}) {

    return {
      ...first,
      ...second,
      ...third
    }

  }

  _mergeHooks(first, second = {}, third = {}) {

    return hooks.reduce((hooks, hook) => ({
      ...hooks,
      [hook]: [
        ...first[hook] || [],
        ...second[hook] || [],
        ...third[hook] || []
      ]
    }), {})

  }

}

export default Component
