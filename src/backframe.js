import NotFoundRoute from './not_found_route'
import Component from './component'
import _ from 'lodash'

class Backframe extends Component {

  defaultFormat = 'json'

  defaultLimit = 100

  knex = null

  logger = null

  plugins = []

  reorter = null

  routes = []

  constructor(config = {}) {
    super(config)
    if(config.defaultFormat) this.setDefaultFormat(config.defaultFormat)
    if(config.defaultLimit) this.setDefaultLimit(config.defaultLimit)
    if(config.knex) this.setKnex(config.knex)
    if(config.logger) this.setLogger(config.logger)
    if(config.plugins) this.setPlugins(config.plugins)
    if(config.routes) this.setRoutes(config.routes)
    if(config.reporter) this.setReporter(config.reporter)
  }

  setDefaultFormat(defaultFormat) {
    this.defaultFormat = defaultFormat
  }

  setDefaultLimit(defaultLimit) {
    this.defaultLimit = defaultLimit
  }

  setKnex(knex) {
    this.knex = knex
  }

  setLogger(logger) {
    this.logger = logger
  }

  setPlugins(plugins) {
    this.plugins = plugins
  }

  addPlugin(plugin) {
    this._addItem('plugins', plugin)
  }

  setReporter(reporter) {
    this.reporter = reporter
  }

  setRoutes(routes) {
    this.routes = routes
  }

  addRoute(route) {
    this._addItem('routes', route)
  }

  render() {

    const hooks = this.plugins.reduce((hooks, plugin) => {

      return plugin.apply(hooks)

    }, this.hooks)

    const options = {
      knex: this.knex,
      logger: this.logger,
      defaultFormat: this.defaultFormat,
      defaultLimit: this.defaultLimit
    }

    return [

      ...this.routes.reduce((routes, route) => [
        ...routes,
        ..._.castArray(route.render(this.path, options, hooks))
      ], []),

      NotFoundRoute.render('', options)

    ]
  }

}

export default Backframe
