import DestroyRoute from './resource/destroy_route'
import CreateRoute from './resource/create_route'
import UpdateRoute from './resource/update_route'
import ShowRoute from './resource/show_route'
import Collection from './collection'
import BackframeError from './error'
import _ from 'lodash'

class Resources extends Collection {

  actions = null

  constructor(config = {}) {
    super(config)
    if(config.actions) this.appendAction(config.actions)
  }

  setActions(actions) {
    this.actions = _.castArray(actions)
  }

  appendAction(action) {
    this._appendItem('actions', action)
  }

  prependAction(action) {
    this._prependItem('actions', action)
  }

  render(options = {}) {

    return this._getRoutes().map(route => {

      if(this.path) route.prependPath(this.path)

      if(this.alterRequest) route.prependAlterRequest(this.alterRequest)

      if(this.beforeProcessor) route.prependBeforeProcessor(this.beforeProcessor)

      if(this.afterProcessor) route.prependAfterProcessor(this.afterProcessor)

      if(this.alterRecord) route.prependAlterRecord(this.alterRecord)

      if(this.beforeCommit) route.prependBeforeCommit(this.beforeCommit)

      if(this.afterCommit) route.prependAfterCommit(this.afterCommit)

      if(this.beforeRollback) route.prependBeforeRollback(this.beforeRollback)

      return route.render({
        ...options,
        ...this._getDestructuredOptions(this.customOptions, route.action)
      })

    })

  }

  async _fetchResource(req, trx, options) {

    req.resource = await options.model.where({
      id: 1
    }).fetch({
      transacting: trx
    })

    if(req.resource) return req

    throw new BackframeError({
      code: 404,
      message: 'Unable to load record'
    })

  }

  _getRoutes() {

    const routes = []

    if(this.actions) {

      this.actions.map(route => routes.push(this._getCollectionRoute(route)))

    }

    if(this._includeAction('create')) routes.push(this._getCreateRoute())

    if(this._includeAction('show')) routes.push(this._getShowRoute())

    if(this._includeAction('update')) routes.push(this._getUpdateRoute())

    if(this._includeAction('destroy')) routes.push(this._getDestroyRoute())

    return routes

  }

  _getCreateRoute() {
    return new CreateRoute({
      allowedParams: this._getDestructuredOption(this, 'allowedParams', 'create'),
      model: this._getDestructuredOption(this, 'model', 'create'),
      serializer: this._getDestructuredOption(this, 'serializer', 'create'),
      virtualParams: this._getDestructuredOption(this, 'virtualParams', 'create')
    })
  }

  _getShowRoute() {
    return new ShowRoute({
      alterRequest: this._fetchResource,
      model: this._getDestructuredOption(this, 'model', 'show'),
      serializer: this._getDestructuredOption(this, 'serializer', 'show')
    })
  }

  _getUpdateRoute() {
    return new UpdateRoute({
      alterRequest: this._fetchResource,
      allowedParams: this._getDestructuredOption(this, 'allowedParams', 'update'),
      model: this._getDestructuredOption(this, 'model', 'update'),
      serializer: this._getDestructuredOption(this, 'serializer', 'update'),
      virtualParams: this._getDestructuredOption(this, 'virtualParams', 'update')
    })
  }

  _getDestroyRoute() {
    return new DestroyRoute({
      alterRequest: this._fetchResource,
      model: this._getDestructuredOption(this, 'model', 'destroy'),
      serializer: this._getDestructuredOption(this, 'serializer', 'destroy')
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
