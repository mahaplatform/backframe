import Component from './component'

class Plugin extends Component {

  name = null

  constructor(config = {}) {
    super(config)
    if(config.name) this.setName(config.name)
  }

  setName(name) {
    this.name = name
  }

  apply(hooks) {

    return this._mergeHooks(hooks, this.hooks)

  }

}

export default Plugin
