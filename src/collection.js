import Component from './component'
import _ from 'lodash'

class Collection extends Component {

  constructor(config = {}) {
    super(config)
    if(config.path) this.setPath(config.path)
    if(config.allowedParams) this.setAllowedParams(config.allowedParams)
    if(config.defaultQuery) this.setDefaultQuery(config.defaultQuery)
    if(config.defaultParams) this.setDefaultParams(config.defaultParams)
    if(config.defaultSort) this.setDefaultSort(config.defaultSort)
    if(config.except) this.setExcept(config.except)
    if(config.model) this.setModel(config.model)
    if(config.only) this.setOnly(config.only)
    if(config.serializer) this.setSerializer(config.serializer)
    if(config.virtualParams) this.setVirtualParams(config.virtualParams)
    if(config.withRelated) this.setWithRelated(config.withRelated)
  }

  setAllowedParams(allowedParams) {
    this._setOption('allowedParams', _.castArray(allowedParams))
  }

  setDefaultQuery(defaultQuery) {
    this._setOption('defaultQuery', _.castArray(defaultQuery))
  }

  setDefaultParams(defaultParams) {
    this._setOption('defaultParams', _.castArray(defaultParams))
  }

  setDefaultSort(defaultSort) {
    this._setOption('defaultSort', _.castArray(defaultSort))
  }

  setExcept(except) {
    this._setOption('except', _.castArray(except))
  }

  setModel(model) {
    this._setOption('model', model)
  }

  setOnly(only) {
    this._setOption('only', _.castArray(only))
  }

  setSerializer(serializer) {
    this._setOption('serializer', serializer)
  }

  setVirtualParams(virtualParams) {
    this._setOption('virtualParams', _.castArray(virtualParams))
  }

  setWithRelated(withRelated) {
    this._setOption('withRelated', _.castArray(withRelated))
  }

  _includeAction(action) {

    if(this.only && !_.includes(this.only, action)) return false

    if(this.except && _.includes(this.except, action)) return false

    return true

  }

  _getDestructuredOptions(options, action) {

    return Object.keys(options).reduce((destructured, option) => {

      const value = this._getDestructuredOption(options, option, action)

      return {
        ...destructured,
        ...value ? { [option]: value } : {}
      }

    }, {})

  }

  _getDestructuredOption(options, option, action) {

    if(_.isPlainObject(options[option])) {

      if(options[option][action]) return options[option][action]

      if(options[option].all) return options[option].all

      const defaultActions = ['all','list','create','show','update','destroy']

      if(_.intersection(defaultActions, Object.keys(options[option])).length > 0) return null

    }

    return options[option]

  }

}

export default Collection
