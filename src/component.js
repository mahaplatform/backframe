import hooks from './utils/hooks'
import _ from 'lodash'

class Component {

  hooks = {}

  options = {}

  path = ''

  constructor(config = {}) {
    hooks.map(hook => this.setHooks(hook, config[hook]))
    if(config.path) this.setPath(config.path)
    this._setOptions(_.omit(config, [...hooks, 'path']))
  }

  setPath(path) {
    this.path = path
  }

  setHooks(name, hook) {
    if(!hook) return
    this.hooks[name] = [
      ...this.hooks[name] || [],
      ..._.castArray(hook)
    ]
  }

  addHook(ev, hook) {
    this.hooks[ev] = [
      ...this.hooks[ev] || [],
      ..._.castArray(hook)
    ]
  }


  _addItem(type, item) {
    this[type] = [
      ...this[type] || [],
      ..._.castArray(item)
    ]
  }

  _setOptions(options) {
    Object.keys(options).map(key => {
      this._setOption(key, options[key])
    })
  }

  _setOption(key, value) {
    this.options[key] = value
  }

  _mergePaths() {
    return Array.prototype.slice.call(arguments).reduce((full, argument) => {
      return `${full}${argument || ''}`
    }, '')
  }

  _mergeOptions() {
    return Array.prototype.slice.call(arguments).reduce((full, argument) => {
      if(!argument) return full
      return Object.keys(argument).reduce((accumulated, key) => ({
        ...accumulated,
        ...this._mergeOption(key, accumulated[key], argument[key])
      }), full)
    }, {})
  }

  _mergeOption(key, accumulated, value) {
    if(!accumulated && !value) return {}
    const append = ['defaultQuery','defaultParams']
    if(_.includes(append, key)) {
      return {
        [key]: [
          ...accumulated || [],
          ...value || []
        ]
      }
    }
    if(!_.isNil(value)) return { [key]: value }
    if(!_.isNil(accumulated)) return { [key]: accumulated }
    return {}
  }

  _mergeHooks() {
    return hooks.reduce((hooks, hook) => ({
      ...hooks,
      [hook]: Array.prototype.slice.call(arguments).reduce((full, argument) => [
        ...full,
        ...argument[hook] || []
      ], [])
    }), {})
  }

}

export default Component
