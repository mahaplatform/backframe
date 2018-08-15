import Component from './component'
import _ from 'lodash'

class Segment extends Component {

  routes = []

  constructor(config = {}) {
    super(config)
    if(config.routes) this.setRoutes(config.routes)
  }

  setRoutes(routes) {
    this.routes = routes
  }

  addRoute(route) {
    this._addItem('routes', route)
  }

  render(segmentPath = '', segmentOptions = {}, segmentHooks = []) {

    return this.routes.reduce((routes, route) => {

      const path = this._mergePaths(segmentPath, this.path)

      const options = this._mergeOptions(segmentOptions, this.options)

      const hooks = this._mergeHooks(segmentHooks, this.hooks)

      return [
        ...routes,
        ..._.castArray(route.render(path, options, hooks))
      ]

    }, [])

  }

}

export default Segment
