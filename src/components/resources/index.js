import pluralize from 'pluralize'
import _ from 'lodash'
import { coerceArray, includeAction, mergeHooks, mergeEvents, mergeParams, pluginOptionDefaults, mergeTypes } from '../../utils/core'
import { validateOptions, defaultOptions } from '../../utils/options'
import load from '../../utils/load'
import buildSegment from '../segment'
import buildRoute from '../route'
import list from './list'
import create from './create'
import edit from './edit'
import show from './show'
import update from './update'
import destroy from './destroy'
import * as constants from '../../constants'

export default (backframeOptions = {}) => (userOptions = {}) => {

  const TYPES = mergeTypes({
    afterCommit: { type: ['function','function[]','function{}','function[]{}'], required: false },
    afterProcessor: { type: ['function','function[]','function{}','function[]{}'], required: false },
    allowedParams: { type: ['string[]','string[]{}'], required: false },
    alterRequest: { type: ['function','function[]','function{}','function[]{}'], required: false },
    alterRecord: { type: ['function','function[]','function{}','function[]{}'], required: false },
    beforeProcessor: { type: ['function','function[]','function{}','function[]{}'], required: false },
    beforeRollback: { type: ['function','function[]','function{}','function[]{}'], required: false },
    collectionActions: { type: 'object', required: false },
    defaultParams: { type: 'function', required: false },
    defaultSort: { type: ['string','string[]'], required: false, default: '-created_at' },
    dependents: { type: 'object[]', required: false },
    except: { type: ['string', 'string[]'], required: false },
    filterParams: { type: 'string[]', required: false, default: [] },
    memberActions: { type: 'object', required: false },
    model: { type: 'object', required: true },
    name: { type: 'string', required: false },
    only: { type: ['string', 'string[]'], required: false },
    path: { type: 'string', required: true },
    pathPrefix: { type: 'string', required: false },
    processor: { type: ['function','function{}'], required: false },
    query: { type: ['function','function{}'], required: false },
    renderer: { type: ['function','function{}'], required: false },
    resources: { type: ['object[]'], required: false },
    responder: { type: ['function','function{}'], required: false },
    searchParams: { type: 'string[]', required: false },
    serializer: { type: ['function','function{}'], required: false },
    softDelete: { type: 'boolean', required: false, default: false },
    sortParams: { type: ['string','string[]'], required: false, default: [] },
    withRelated: { type: ['string','string[]','string[]{}','object','object[]','object[]{}'], required: false },
    virtualFilters: { type: ['object'], required: false, default: {} },
    virtualParams: { type: ['string','string[]'], required: false, default: [] }
  }, backframeOptions.plugins)

  validateOptions('resources', userOptions, TYPES)

  const mergedOptions = {
    ..._.pick(backframeOptions, ['defaultFormat','defaultLimit','knex']),
    ...userOptions
  }

  const options = normalizeOptions(mergedOptions, TYPES)

  return buildResources(options, buildSegment(backframeOptions), buildRoute(backframeOptions))

}

export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    name: pluralize.singular(userOptions.model.extend().__super__.tableName),
    ...userOptions,
    ...mapOptionsToActions(userOptions, [...constants.BACKFRAME_LIFECYCLE, 'allowedParams','query','serializer','withRelated'])
  }

}


// build all rest and custom routes
export const buildResources = (options, buildSegment, buildRoute) => {

  const pathPrefix = options.pathPrefix ? `${options.pathPrefix}${options.path}` : `${options.path}`

  return buildSegment({
    pathPrefix,
    routes: [
      ...buildCustomRoutes(options.collectionActions, options, buildRoute, false),
      ...buildCustomRoutes(options.memberActions, options, buildRoute, true),
      ...buildStandardRoutes(options, buildRoute),
      ...buildNestedResourcs(options, buildSegment)
    ]
  })

}

// build custom rest actions
export const buildCustomRoutes = (actions, options, buildRoute, id) => {

  if(!actions) return []

  return Object.keys(actions).reduce((routes, name) => {

    const action = actions[name]

    const path = id ? `/:id${action.path}` : action.path

    const namespaced = { ...action, path }

    return [
      ...routes,
      buildSingleRoute(name, options, namespaced)
    ]

  }, [])

}

// build standard rest routes
export const buildStandardRoutes = (options, buildRoute) => {

  const actions = { list, create, edit, show, update, destroy }

  return Object.keys(actions).filter(action => {

    return includeAction(action, options.only, options.except)

  }).reduce((routes, action) => {

    const route = actions[action](buildRoute)

    return [
      ...routes,
      buildSingleRoute(action, options, route)
    ]

  }, [])

}

// load resource before route
const loadResource =  async (req, trx, options) => {

  req.resource = await load(req, trx, options)

  return req

}

// build single rest route
export const buildSingleRoute = (name, options, route) => {

  const mergedRouteOptions = mergeRouteOptions(name, options, route.options)

  const routeOptions = _.omit(mergedRouteOptions, [...constants.BACKFRAME_LIFECYCLE,'actions','except','only','pathPrefix'])

  if(route.path.substr(0,4) == '/:id') {

    route.handler.alterRequest = [
      ...coerceArray(route.handler.alterRequest),
      loadResource
    ]

  }

  return {
    ...route,
    options: {
      ...routeOptions,
      action: name
    },
    handler: {
      ...mergeHooks(route.handler, mergedRouteOptions),
      ...mergeEvents(route.handler, mergedRouteOptions)
    }
  }

}

export const buildNestedResourcs = (options, buildSegment) => {

  if(!options.resources) return []

  const pathPrefix = `/:${options.name}_id`

  return buildSegment({
    pathPrefix,
    routes: [
      ...options.resources
    ]
  })

}

// destructure mapped options and preapre hash to be merged
export const mergeRouteOptions = (name, options, routeOptions) => {

  return _.omitBy({
    ...options,
    ...mergeOptionsForAction(options, constants.BACKFRAME_HOOKS, name, ),
    ...overrideOptionsForAction(options, [...constants.BACKFRAME_EVENTS,'allowedParams','query','serializer','withRelated'], name),
    ...routeOptions
  }, _.isNil)

}

const mapOptionsToActions = (options, keys) => {

  return keys.reduce((mapped, key) => ({
    ...mapped,
    [key]: mapOptionToActions(options[key])
  }), {})

}

export const mapOptionToActions = (value) => {

  return value !== null ? (!_.isPlainObject(value) ? { all: value } : value) : {}

}

// merge all and named option
const mergeOptionsForAction = (options, keys, name) => {

  return keys.reduce((merged, key) => ({
    ...merged,
    [key]: mergeParams(options[key].all, options[key][name])
  }), {})

}

// override all option with named option
const overrideOptionsForAction = (options, keys, name) => {

  return keys.reduce((mapped, key) => ({
    ...mapped,
    [key]: options[key][name] || options[key].all
  }), {})

}
