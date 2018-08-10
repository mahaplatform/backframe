import DestroyRoute from './routes/destroy_route'
import CreateRoute from './routes/create_route'
import UpdateRoute from './routes/update_route'
import ListRoute from './routes/list_route'
import ShowRoute from './routes/show_route'
import reserved from './utils/reserved'
import BackframeError from './error'
import Component from './component'
import _ from 'lodash'

class Resources extends Component {

  collectionActions = []

  filterParams = []

  model = null

  memberActions = []

  only = null

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

      return route.render({
        ...options,
        ...this._getDestructuredOptions(this.customOptions, route.action)
      })

    })

  }

  _includeAction(action) {

    if(this.only && !_.includes(this.only, action)) return false

    if(this.except && _.includes(this.except, action)) return false

    return true

  }

  _getDestructuredOptions(options, action) {

    return Object.keys(options).reduce((destructured, option) => {

      const value = this._getDestructuredOption(options, option, action)

      return {
        ...destructured,
        ...value ? { [option]: value } : {}
      }

    }, {})

  }

  _getDestructuredOption(options, option, action) {

    if(_.isPlainObject(options[option])) {

      if(options[option][action]) return options[option][action]

      if(options[option].all) return options[option].all

      const defaultActions = ['all','list','create','show','update','destroy']

      if(_.intersection(defaultActions, Object.keys(options[option])).length > 0) return null

    }

    return options[option]

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
      defaultQuery: this._getDestructuredOption(this, 'defaultQuery', 'list'),
      defaultSort: this._getDestructuredOption(this, 'defaultSort', 'list'),
      filterParams: this._getDestructuredOption(this, 'filterParams', 'list'),
      model: this._getDestructuredOption(this, 'model', 'list'),
      serializer: this._getDestructuredOption(this, 'serializer', 'list'),
      searchParams: this._getDestructuredOption(this, 'searchParams', 'list'),
      sortParams: this._getDestructuredOption(this, 'sortParams', 'list'),
      withRelated: this._getDestructuredOption(this, 'withRelated', 'list')
    })
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
