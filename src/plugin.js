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

    if(this.alterRequest) backframe.prependAlterRequest(this.alterRequest)

    if(this.beforeProcessor) backframe.prependBeforeProcessor(this.beforeProcessor)

    if(this.afterProcessor) backframe.prependAfterProcessor(this.afterProcessor)

    if(this.alterRecord) backframe.prependAlterRecord(this.alterRecord)

    if(this.beforeCommit) backframe.prependBeforeCommit(this.beforeCommit)

    if(this.afterCommit) backframe.prependAfterCommit(this.afterCommit)

    if(this.beforeRollback) backframe.prependBeforeRollback(this.beforeRollback)

  }

}

export default Plugin
