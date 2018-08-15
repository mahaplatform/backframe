import DestroyRoute from './resources/destroy_route'
import CreateRoute from './resources/create_route'
import UpdateRoute from './resources/update_route'
import ListRoute from './resources/list_route'
import ShowRoute from './resources/show_route'
import EditRoute from './resources/edit_route'
import Collection from './collection'
import BackframeError from './error'
import _ from 'lodash'

class Resources extends Collection {

  collectionActions = []

  memberActions = []

  constructor(config = {}) {
    super(config)
    if(config.collectionActions) this.setCollectionActions(config.collectionActions)
    if(config.filterParams) this.setFilterParams(config.filterParams)
    if(config.memberActions) this.setMemberActions(config.memberActions)
    if(config.searchParams) this.setSearchParams(config.searchParams)
    if(config.sortParams) this.setSortParams(config.sortParams)
    if(config.virtualFilters) this.setVirtualFilters(config.virtualFilters)
  }

  setFilterParams(filterParams) {
    this._setOption('filterParams', _.castArray(filterParams))
  }

  setSearchParams(searchParams) {
    this._setOption('searchParams', _.castArray(searchParams))
  }

  setSortParams(sortParams) {
    this._setOption('sortParams', _.castArray(sortParams))
  }

  setVirtualFilters(virtualFilters) {
    this._setOption('virtualFilters', _.castArray(virtualFilters))
  }

  setCollectionActions(collectionActions) {
    this.collectionActions = _.castArray(collectionActions)
  }

  setMemberActions(memberActions) {
    this.memberActions = _.castArray(memberActions)
  }

  render(resourcesPath = '', resourcesOptions = {}, resourcesHooks = {}) {

    return this._getRoutes().map(route => {

      const path = this._mergePaths(resourcesPath, this.path)

      const actionOptions = this._getDestructuredOptions(this.options, route.action)

      const options = this._mergeOptions(resourcesOptions, actionOptions)

      const actionHooks = Object.keys(this.hooks).reduce((hooks, hook) => ({
        ...hooks,
        [hook]: this._getDestructuredOptions(this.hooks[hook], route.action)
      }), {})

      const hooks = this._mergeHooks(resourcesHooks, actionHooks)

      return route.render(path, options, hooks)

    })

  }

  async _fetchResource(req, trx, options) {

    req.resource = await options.model.where({
      id: req.params.id
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

    if(this._includeAction('list')) routes.push(this._getListRoute())

    if(this._includeAction('create')) routes.push(this._getCreateRoute())

    this.collectionActions.map(route => routes.push(this._getCollectionRoute(route)))

    if(this._includeAction('show')) routes.push(this._getShowRoute())

    if(this._includeAction('edit')) routes.push(this._getEditRoute())

    if(this._includeAction('update')) routes.push(this._getUpdateRoute())

    if(this._includeAction('destroy')) routes.push(this._getDestroyRoute())

    this.memberActions.map(route => routes.push(this._getMemberRoute(route)))

    return routes

  }

  _getListRoute() {
    return new ListRoute()
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
      alterRequest: this._fetchResource,
      model: this._getDestructuredOption(this.options, 'model', 'destroy'),
      serializer: this._getDestructuredOption(this.options, 'serializer', 'destroy')
    })
  }

  _getCollectionRoute(route) {
    return route
  }

  _getMemberRoute(route) {
    route.setPath(`/:id${route.path}`)
    route.addHook('alterRequest', this._fetchResource)
    return route
  }

}

export default Resources
