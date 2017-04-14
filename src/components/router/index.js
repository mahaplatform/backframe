import { Router } from 'express'
import cors from 'cors'
import _ from 'lodash'
import { validateOptions, defaultOptions } from '../../utils/options'
import { mergeEvents, mergeHooks } from '../../utils/core'
import buildHandler from '../handler'
import notFound from './not_found'
import logger from '../../utils/logger'
import * as constants from '../../constants'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = {
      cors: { type: 'boolean', required: false, default: false },
      log: { type: 'function', required: false },
      notFound: { type: 'boolean', required: false, default: true },
      routes: { type: 'object[]', required: false }
    }

    validateOptions('router', userOptions, TYPES)

    const options = normalizeOptions(userOptions, TYPES)

    return buildRouter(backframeOptions, options, buildHandler(backframeOptions))

  }

}

// normalize and merge defaut options
export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }

}

// iterate through routing array and configure all events and hooks with
// accumuated routeOptions
const renderHandler = (plugins, route) => {

  return {
    ...mergeHooks({}, [ ...plugins, route.handler ], route.options),
    ...mergeEvents({}, [ ...plugins, route.handler ], route.options)
  }

}

// iterate through routing array and generate express router
export const buildRouter = (backframeOptions, options, buildHandler) => {

  const router = Router({ mergeParams: true })

  if(options.cors) router.use(cors())

  options.routes.map(route => {

    const path = options.prefix ? options.prefix + route.path : route.path

    const handler = _.isFunction(route.handler) ? route.handler : buildHandler(renderHandler(backframeOptions.plugins, route))

    const wrappedHandler = (req, res) => logger(options)(req, res, handler)

    router[route.method](path, wrappedHandler)

  })

  if(options.notFound) router.use((req, res) => logger(options)(req, res, buildHandler(notFound)))

  return router

}
