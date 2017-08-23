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

// iterate through routing array and generate express router
export const buildRouter = (backframeOptions, options, buildHandler, buildRoute) => {

  const router = Router({ mergeParams: true })

  router.use(bodyParser.urlencoded({ extended: true }))

  router.use(bodyParser.json())

  if(options.cors) router.use(cors())

  options.routes.map(route => {

    const path = options.pathPrefix ? options.pathPrefix + route.path : route.path

    const formattedPath = `${path.replace(':id',':id(\\d+)')}\.:format?`

    const merged = mergeLifecycle(backframeOptions.plugins, route)

    const handlerOptions = { ...route.options, ...merged }

    const handler = _.isFunction(route.handler) ? route.handler : buildHandler(handlerOptions)

    router[route.method](formattedPath, handler)

  })

  const pathPrefix = options.pathPrefix || ''

  if(options.notFound) router.use(pathPrefix, notFound)

  return router

}
