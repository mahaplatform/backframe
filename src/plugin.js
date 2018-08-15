import Component from './component'
import _ from 'lodash'

class Plugin extends Component {

  name = null

  constructor(config = {}) {
    super(config)
    if(config.name) this.setName(config.name)
    if(config.defaultQuery) this.setDefaultQuery(config.defaultQuery)
    if(config.defaultParams) this.setDefaultParams(config.defaultParams)
  }

  setName(name) {
    this.name = name
  }

  setDefaultQuery(defaultQuery) {
    this._setOption('defaultQuery', _.castArray(defaultQuery))
  }

  setDefaultParams(defaultParams) {
    this._setOption('defaultParams', _.castArray(defaultParams))
  }

  apply(hooks) {

    return this._mergeHooks(hooks, this.hooks)

  }

}

export default Plugin
