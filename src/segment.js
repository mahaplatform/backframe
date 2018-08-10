import Component from './component'
import _ from 'lodash'

class Segment extends Component {

  path = null

  routes = []

  constructor(config = {}) {
    super(config)
    if(config.path) this.setPath(config.path)
    if(config.routes) this.appendRoute(config.routes)
  }

  setPath(path) {
    this.path = path
  }

  prependPath(path) {
    this.path = `${path}${this.path}`
  }

  appendRoute(route) {
    this._appendItem('routes', route)
  }

  prependRoute(route) {
    this._prependItem('routes', route)
  }

  render(options = {}) {

    return this.routes.reduce((routes, route) => {

      if(this.path) route.prependPath(this.path)

      if(this.alterRequest) route.prependAlterRequest(this.alterRequest)

      if(this.beforeProcessor) route.prependBeforeProcessor(this.beforeProcessor)

      if(this.afterProcessor) route.prependAfterProcessor(this.afterProcessor)

      if(this.alterRecord) route.prependAlterRecord(this.alterRecord)

      if(this.beforeCommit) route.prependBeforeCommit(this.beforeCommit)

      if(this.afterCommit) route.prependAfterCommit(this.afterCommit)

      if(this.beforeRollback) route.prependBeforeRollback(this.beforeRollback)

      return [
        ...routes,
        ..._.castArray(route.render(options))
      ]

    }, [])

  }

}

export default Segment
