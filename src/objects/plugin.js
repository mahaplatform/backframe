import Component from './component'

class Plugin extends Component {

  name = null

  options = []

  constructor(config = {}) {
    super(config)
    if(config.name) this.setName(config.name)
    if(config.options) this.setOptions(config.options)
  }

  setName(name) {
    this.name = name
  }

  setOptions(options) {
    this.options = options
  }

  apply(backframe) {

    if(this.beforeProcessor) backframe.appendBeforeProcessor(this.beforeProcessor)

    if(this.afterProcessor) backframe.appendAfterProcessor(this.afterProcessor)

  }

}

export default Plugin
