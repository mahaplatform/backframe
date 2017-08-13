import { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import _ from 'lodash'
import { validateOptions, defaultOptions } from '../../utils/options'
import { mergeEvents, mergeHooks } from '../../utils/core'
import buildHandler from '../handler'
import buildRoute from '../route'
import notFound from './not_found'
import * as constants from '../../constants'
import { beginLogger, endLogger, recordTick, printLogger } from '../../utils/logger'

export default (backframeOptions = {}) => (userOptions = {}) => {

  const TYPES = {
    cors: { type: 'boolean', required: false, default: false },
    log: { type: 'function', required: false },
    notFound: { type: 'boolean', required: false, default: true },
    pathPrefix: { type: 'string', required: false },
    routes: { type: 'object[]', required: false }
  }

  validateOptions('router', userOptions, TYPES)

  const mergedOptions = {
    ..._.pick(backframeOptions, ['knex']),
    ...userOptions
  }

  const options = normalizeOptions(mergedOptions, TYPES)

  return buildRouter(backframeOptions, options, buildHandler(backframeOptions), buildRoute(backframeOptions))

}

// normalize and merge defaut options
export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions,
    routes: _.flatten(userOptions.routes)
  }

}

// iterate through routing array and configure all events and hooks with
// accumuated routeOptions
const mergeLifecycle = (plugins, route) => {

  return {
    ...mergeHooks({}, [ ...plugins, route.handler ]),
    ...mergeEvents({}, [ ...plugins, route.handler ])
  }

}


const renderHandler = (lifecycle, options) => {

  return Object.keys(lifecycle).reduce((keys, key) => ({
    ...keys,
    [key]: _.isArray(lifecycle[key]) ? lifecycle[key].map(item => item(options)) : lifecycle[key](options)
  }), {})

}

// iterate through routing array and generate express router
export const buildRouter = (backframeOptions, options, buildHandler, buildRoute) => {

  const router = Router({ mergeParams: true })

  router.use(bodyParser.urlencoded({ extended: true }))

  router.use(bodyParser.json())

  if(options.cors) router.use(cors())

  options.routes.map(route => {

    const path = options.pathPrefix ? options.pathPrefix + route.path : route.path

    const merged = mergeLifecycle(backframeOptions.plugins, route)

    const handlerLifecycle = _.pick(merged, constants.BACKFRAME_LIFECYCLE)

    const handlerOptions = { ...route.options, ..._.omit(merged, constants.BACKFRAME_LIFECYCLE) }

    const rendered = renderHandler(handlerLifecycle, handlerOptions)

    const handler = _.isFunction(route.handler) ? route.handler : buildHandler(rendered)

    router[route.method](`${path.replace(':id',':id(\\d+)')}\.:format?`, handler)

  })

  const pathPrefix = options.pathPrefix || ''

  if(options.notFound) router.use(pathPrefix, notFound)

  return router

}
