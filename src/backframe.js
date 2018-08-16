import NotFoundRoute from './not_found_route'
import Component from './component'
import _ from 'lodash'

class Backframe extends Component {

  plugins = []

  routes = []

  constructor(config = {}) {
    super(config)
    this.setDefaultFormat(config.defaultFormat || 'json')
    this.setDefaultLimit(config.defaultLimit || 100)
    if(config.knex) this.setKnex(config.knex)
    if(config.logger) this.setLogger(config.logger)
    if(config.plugins) this.setPlugins(config.plugins)
    if(config.redis) this.setRedis(config.redis)
    if(config.routes) this.setRoutes(config.routes)
    if(config.reporter) this.setReporter(config.reporter)
  }

  setDefaultFormat(defaultFormat) {
    this._setOption('defaultFormat', defaultFormat)
  }

  setDefaultLimit(defaultLimit) {
    this._setOption('defaultLimit', defaultLimit)
  }

  setKnex(knex) {
    this._setOption('knex', knex)
  }

  setLogger(logger) {
    this._setOption('logger', logger)
  }

  setPlugins(plugins) {
    this.plugins = plugins
  }

  addPlugin(plugin) {
    this._addItem('plugins', plugin)
  }

  setRedis(redis) {
    this._setOption('redis', redis)
  }

  setReporter(reporter) {
    this._setOption('reporter', reporter)
  }

  setRoutes(routes) {
    this.routes = routes
  }

  addRoute(route) {
    this._addItem('routes', route)
  }

  render() {

    const plugins = this.plugins.reduce((items, plugin) => ({
      hooks: this._mergeHooks(items.hooks, plugin.hooks),
      options: this._mergeOptions(items.options, plugin.options)
    }), { hooks: [], options })

    const options = this._mergeOptions(this.options, plugins.options)

    const hooks = this._mergeHooks(this.options, plugins.hooks)

    return [
      ...this.routes.reduce((routes, route) => [
        ...routes,
        ..._.castArray(route.render(this.path, options, hooks))
      ], [])
    ]

  }

}

export default Backframe
