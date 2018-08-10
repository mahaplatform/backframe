import DestroyRoute from './destroy_route'
import CreateRoute from './create_route'
import UpdateRoute from './update_route'
import BackframeError from './error'
import ListRoute from './list_route'
import ShowRoute from './show_route'
import Component from './component'
import _ from 'lodash'

class Resources extends Component {

  collectionActions = []

  filterParams = []

  model = null

  memberActions = []

  only = null

  path = null

  except = null

  serializer = null

  sortParams = []

  constructor(config = {}) {
    super(config)
    if(config.allowedParams) this.setAllowedParams(config.allowedParams)
    if(config.collectionActions) this.appendCollectionAction(config.collectionActions)
    if(config.except) this.setExcept(config.except)
    if(config.filterParams) this.setFilterParams(config.filterParams)
    if(config.memberActions) this.appendMemberAction(config.memberActions)
    if(config.model) this.setModel(config.model)
    if(config.only) this.setOnly(config.only)
    if(config.path) this.setPath(config.path)
    if(config.serializer) this.setSerializer(config.serializer)
    if(config.sortParams) this.setSortParams(config.sortParams)
  }

  setAllowedParams(allowedParams) {
    this.allowedParams = allowedParams
  }

  setExcept(except) {
    this.except = except
  }

  setFilterParams(filterParams) {
    this.filterParams = filterParams
  }

  setModel(model) {
    this.model = model
  }

  setOnly(only) {
    this.only = only
  }

  setPath(path) {
    this.path = path
  }

  prependPath(path) {
    this.path = `${path}${this.path}`
  }

  setSerializer(serializer) {
    this.serializer = serializer
  }

  setSortParams(sortParams) {
    this.sortParams = sortParams
  }

  appendCollectionAction(action) {
    this._appendItem('collectionActions', action)
  }

  prependCollectionAction(action) {
    this._prependItem('collectionActions', action)
  }

  appendMemberAction(action) {
    this._appendItem('memberActions', action)
  }

  prependMemberAction(action) {
    this._prependItem('memberActions', action)
  }

  render(options = {}) {

    const routes = []

    if(this._includeAction('list')) routes.push(this._getListRoute())

    if(this._includeAction('create')) routes.push(this._getCreateRoute())

    this.collectionActions.map(route => routes.push(this._getCollectionRoute(route)))

    if(this._includeAction('show')) routes.push(this._getShowRoute())

    if(this._includeAction('update')) routes.push(this._getUpdateRoute())

    if(this._includeAction('destroy')) routes.push(this._getDestroyRoute())

    this.memberActions.map(route => routes.push(this._getMemberRoute(route)))

    return routes.map(route => {

      if(this.path) route.prependPath(this.path)

      if(this.alterRequest) route.prependAlterRequest(this.alterRequest)

      if(this.beforeProcessor) route.prependBeforeProcessor(this.beforeProcessor)

      if(this.afterProcessor) route.prependAfterProcessor(this.afterProcessor)

      if(this.alterRecord) route.prependAlterRecord(this.alterRecord)

      if(this.beforeCommit) route.prependBeforeCommit(this.beforeCommit)

      if(this.afterCommit) route.prependAfterCommit(this.afterCommit)

      if(this.beforeRollback) route.prependBeforeRollback(this.beforeRollback)

      return route.render(options)

    })

  }

  _includeAction(action) {

    if(this.only && !_.includes(this.only, action)) return false

    if(this.except && _.includes(this.except, action)) return false

    return true

  }

  _destructureParam(key, action) {

    if(_.isPlainObject(this[key])) {

      if(this[key][action]) return this[key][action]

      if(this[key].all) return this[key].all

    }

    return this[key]

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

  _getListRoute() {
    return new ListRoute({
      defaultQuery: this._destructureParam('defaultQuery', 'list'),
      defaultSort: this._destructureParam('defaultSort', 'list'),
      filterParams: this._destructureParam('filterParams', 'list'),
      model: this._destructureParam('model', 'list'),
      serializer: this._destructureParam('serializer', 'list'),
      searchParams: this._destructureParam('searchParams', 'list'),
      sortParams: this._destructureParam('sortParams', 'list'),
      withRelated: this._destructureParam('withRelated', 'list')
    })
  }

  _getCreateRoute() {
    return new CreateRoute({
      allowedParams: this._destructureParam('allowedParams', 'create'),
      model: this._destructureParam('model', 'create'),
      serializer: this._destructureParam('serializer', 'create'),
      virtualParams: this._destructureParam('virtualParams', 'create')
    })
  }

  _getShowRoute() {
    return new ShowRoute({
      alterRequest: this._fetchResource,
      model: this._destructureParam('model', 'show'),
      serializer: this._destructureParam('serializer', 'show')
    })
  }

  _getUpdateRoute() {
    return new UpdateRoute({
      alterRequest: this._fetchResource,
      allowedParams: this._destructureParam('allowedParams', 'update'),
      model: this._destructureParam('model', 'update'),
      serializer: this._destructureParam('serializer', 'update'),
      virtualParams: this._destructureParam('virtualParams', 'update')
    })
  }

  _getDestroyRoute() {
    return new DestroyRoute({
      alterRequest: this._fetchResource,
      model: this._destructureParam('model', 'destroy'),
      serializer: this._destructureParam('serializer', 'destroy')
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
