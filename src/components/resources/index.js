import pluralize from 'pluralize'
import _ from 'lodash'
import { includeAction, mergeHooks, mergeEvents, mergeParams, pluginOptionDefaults, mergeTypes } from '../../utils/core'
import { validateOptions, defaultOptions } from '../../utils/options'
import buildSegment from '../segment'
import buildRoute from '../route'
import list from './list'
import create from './create'
import edit from './edit'
import show from './show'
import update from './update'
import destroy from './destroy'
import * as constants from '../../constants'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = mergeTypes({
      actions: { type: 'object', required: false },
      after: { type: ['function','function{}'], required: false },
      allowedParams: { type: ['string[]','string[]{}'], required: false },
      alterRequest: { type: ['function','function{}'], required: false },
      alterRecord: { type: ['function','function{}'], required: false },
      before: { type: ['function','function{}'], required: false },
      cacheFor: { type: 'integer', required: false },
      defaultParams: { type: 'function', required: false },
      defaultSort: { type: ['string','string[]'], required: false, default: '-created_at' },
      dependents: { type: 'object[]', required: false },
      except: { type: 'string[]', required: false },
      filterParams: { type: 'string[]', required: false },
      model: { type: 'object', required: true },
      name: { type: 'string', required: false },
      only: { type: 'string[]', required: false },
      path: { type: 'string', required: false },
      pathPrefix: { type: 'string', required: false },
      processor: { type: ['function','function{}'], required: false },
      query: { type: ['function','function{}'], required: false },
      renderer: { type: ['function','function{}'], required: false },
      responder: { type: ['function','function{}'], required: false },
      searchParams: { type: 'string[]', required: false },
      serializer: { type: ['function','function{}'], required: false },
      softDelete: { type: 'boolean', required: false, default: false },
      sortParams: { type: ['string','string[]'], required: false },
      withRelated: { type: ['string','string[]','string[]{}'], required: false },
    }, backframeOptions.plugins)

    validateOptions('resources', userOptions, TYPES)

    const mergedOptions = {
      ..._.pick(backframeOptions, ['defaultFormat','defaultLimit']),
      ...userOptions
    }

    const options = normalizeOptions(mergedOptions, TYPES)

    return buildResources(options, buildSegment(backframeOptions), buildRoute(backframeOptions))

  }

}

export const normalizeOptions = (userOptions, types) => {

  const name = userOptions.name || pluralize.singular(userOptions.model.extend().__super__.tableName)

  const derivedOptions = {
    name,
    path: pluralize.plural(name)
  }

  return {
    ...defaultOptions(types),
    ...derivedOptions,
    ...userOptions,
    ...mapOptionsToActions(userOptions, [...constants.BACKFRAME_LIFECYCLE, 'allowedParams','query','serializer','withRelated'])
  }

}


// build all rest and custom routes
export const buildResources = (options, buildSegment, buildRoute) => {

  const pathPrefix = options.pathPrefix ? `${options.pathPrefix}/${options.path}` : `/${options.path}`

  return buildSegment({
    pathPrefix,
    routes: [
      ...buildCustomRoutes(options, buildRoute),
      ...buildStandardRoutes(options, buildRoute)
    ]
  })

}

// build custom rest actions
export const buildCustomRoutes = (options, buildRoute) => {

  if(!options.actions) return []

  return Object.keys(options.actions).reduce((routes, name) => {

    const action = options.actions[name]

    const path = `/:id/${action.path}`

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

// build single rest route
export const buildSingleRoute = (name, options, route) => {

  const mergedRouteOptions = mergeRouteOptions(name, options)

  const routeOptions = _.omit(mergedRouteOptions, [...constants.BACKFRAME_LIFECYCLE,'actions','except','only','pathPrefix'])

  return {
    ...route,
    options: {
      ...routeOptions,
      action: name
    },
    handler: {
      ...mergeEvents(route.handler, mergedRouteOptions),
      ...mergeHooks(route.handler, mergedRouteOptions)
    }
  }

}

// destructure mapped options and preapre hash to be merged
export const mergeRouteOptions = (name, options) => {

  return _.omitBy({
    ...options,
    ...mergeOptionsForAction(options, constants.BACKFRAME_HOOKS, name, ),
    ...overrideOptionsForAction(options, [...constants.BACKFRAME_EVENTS,'allowedParams','query','serializer','withRelated'], name)
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
