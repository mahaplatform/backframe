import NotFoundRoute from './not_found_route'
import Component from './component'
import _ from 'lodash'

class Backframe extends Component {

  defaultFormat = 'json'

  defaultLimit = 100

  knex = null

  logger = null

  plugins = []

  routes = []

  constructor(config = {}) {
    super(config)
    if(config.defaultFormat) this.setDefaultFormat(config.defaultFormat)
    if(config.defaultLimit) this.setDefaultLimit(config.defaultLimit)
    if(config.knex) this.setKnex(config.knex)
    if(config.logger) this.setLogger(config.logger)
    if(config.plugins) this.appendPlugin(config.plugins)
    if(config.routes) this.appendRoute(config.routes)
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

  appendPlugin(plugin) {
    this._appendItem('plugins', plugin)
  }

  prependPlugin(plugin) {
    this._prependItem('plugins', plugin)
  }

  setRoutes(routes) {
    this.routes = routes
  }

  appendRoute(route) {
    this._appendItem('routes', route)
  }

  prependRoute(route) {
    this._prependItem('routes', route)
  }

  render() {

    this.plugins.map(plugin => {

      plugin.apply(this)

    })

    const options = {
      knex: this.knex,
      logger: this.logger,
      defaultFormat: this.defaultFormat,
      defaultLimit: this.defaultLimit
    }

    return [

      ...this.routes.reduce((routes, route) => {

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

      }, []),

      NotFoundRoute.render(options)

    ]
  }

}

export default Backframe
