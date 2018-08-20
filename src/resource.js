import DestroyRoute from './resource/destroy_route'
import CreateRoute from './resource/create_route'
import UpdateRoute from './resource/update_route'
import ShowRoute from './resource/show_route'
import EditRoute from './resource/edit_route'
import Collection from './collection'
import BackframeError from './error'
import _ from 'lodash'

class Resources extends Collection {

  actions = []

  constructor(config = {}) {
    super(config)
    if(config.actions) this.setActions(config.actions)
  }

  setActions(actions) {
    this.actions = _.castArray(actions)
  }

  render(resourcePath = '', resourceOptions = {}, resourceHooks = {}) {

    return this._getRoutes().map(route => {

      const path = this._mergePaths(resourcePath, this.path)

      const actionOptions = this._getDestructuredOptions(this.options, route.action)

      const options = this._mergeOptions(resourceOptions, actionOptions)

      const actionHooks = Object.keys(this.collectionHooks).reduce((hooks, hook) => {

        const actionHooks = this._getDestructuredOption(this.collectionHooks, hook, route.action)

        return {
          ...hooks,
          ...actionHooks ? { [hook]: actionHooks } : {}
        }

      }, {})

      const hooks = this._mergeHooks(resourceHooks, actionHooks)

      return route.render(path, options, hooks)

    })

  }

  async _fetchResource(req, trx, options) {

    req.resource = await options.model.where({
      id: req.params.id
    }).fetch({
      transacting: trx,
      withRelated: options.withRelated ? _.castArray(options.withRelated): []
    })

    if(req.resource) return req

    throw new BackframeError({
      code: 404,
      message: 'Unable to load record'
    })

  }

  _getRoutes() {

    const routes = []

    this.actions.map(route => routes.push(this._getCollectionRoute(route)))

    if(this._includeAction('create')) routes.push(this._getCreateRoute())

    if(this._includeAction('show')) routes.push(this._getShowRoute())

    if(this._includeAction('edit')) routes.push(this._getEditRoute())

    if(this._includeAction('update')) routes.push(this._getUpdateRoute())

    if(this._includeAction('destroy')) routes.push(this._getDestroyRoute())

    return routes

  }

  _getCreateRoute() {
    return new CreateRoute()
  }

  _getShowRoute() {
    return new ShowRoute({
      alterRequest: this._fetchResource
    })
  }

  _getEditRoute() {
    return new EditRoute({
      alterRequest: this._fetchResource
    })
  }

  _getUpdateRoute() {
    return new UpdateRoute({
      alterRequest: this._fetchResource
    })
  }

  _getDestroyRoute() {
    return new DestroyRoute({
      alterRequest: this._fetchResource
    })
  }

  _getCollectionRoute(route) {
    return route
  }

  _getMemberRoute(route) {
    route.prependPath('/:id')
    route.prependAlterRequest(this._fetchResource)
    return route
  }

}

export default Resources
