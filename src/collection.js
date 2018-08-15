import Component from './component'
import _ from 'lodash'

class Collection extends Component {

  allowedParams = null

  defaultParams = null

  defaultQuery = null

  except = null

  model = null

  only = null

  serializer = null

  virtualParams = null

  withRelated = null

  constructor(config = {}) {
    super(config)
    if(config.allowedParams) this.setAllowedParams(config.allowedParams)
    if(config.defaultQuery) this.setDefaultQuery(config.defaultQuery)
    if(config.defaultParams) this.setDefaultParams(config.defaultParams)
    if(config.except) this.setExcept(config.except)
    if(config.model) this.setModel(config.model)
    if(config.only) this.setOnly(config.only)
    if(config.serializer) this.setSerializer(config.serializer)
    if(config.virtualParams) this.setVirtualParams(config.virtualParams)
    if(config.withRelated) this.setWithRelated(config.withRelated)
  }

  setAllowedParams(params) {
    this.allowedParams = _.castArray(params)
  }

  setDefaultQuery(defaultQuery) {
    this.defaultQuery = defaultQuery
  }

  setDefaultParams(params) {
    this.defaultParams = _.castArray(params)
  }

  setExcept(except) {
    this.except = except
  }

  setModel(model) {
    this.model = model
  }

  setOnly(only) {
    this.only = only
  }

  setSerializer(serializer) {
    this.serializer = serializer
  }

  setVirtualParams(params) {
    this.virtualParams = _.castArray(params)
  }

  setWithRelated(withRelated) {
    this.withRelated = withRelated
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
