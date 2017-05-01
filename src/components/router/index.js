import { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import _ from 'lodash'
import { validateOptions, defaultOptions } from '../../utils/options'
import { mergeEvents, mergeHooks } from '../../utils/core'
import buildHandler from '../handler'
import notFound from './not_found'
import * as constants from '../../constants'
import { beginLogger, endLogger, recordTick, printLogger } from '../../utils/logger'
import { fail } from '../../utils/response'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = {
      cors: { type: 'boolean', required: false, default: false },
      log: { type: 'function', required: false },
      notFound: { type: 'boolean', required: false, default: true },
      routes: { type: 'object[]', required: false }
    }

    validateOptions('router', userOptions, TYPES)

    const mergedOptions = {
      ..._.pick(backframeOptions, ['knex','redis']),
      ...userOptions
    }

    const options = normalizeOptions(mergedOptions, TYPES)

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

  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())

  if(options.cors) router.use(cors())

  options.routes.map(route => {

    const path = options.prefix ? options.prefix + route.path : route.path

    const handler = _.isFunction(route.handler) ? route.handler : buildHandler(renderHandler(backframeOptions.plugins, route))

    const wrapped = buildRoute(options, handler)

    router[route.method](`${path.replace(':id',':id(\\d+)')}\.:format?`, wrapped)

  })

  if(options.notFound) router.use((req, res) => buildHandler(notFound))

  return router

}

const buildRoute = (options, handler) => {

  return (req, res) => {

    return Promise.resolve().then(() => {

      return beginLogger(options)()

    }).then(() => {

      return handler(req, res, recordTick)

    }).then(result => {

      return endLogger(options)().then(() => result)

    }).then(result => {

      printLogger(options)(req, res, result)

    }).catch(err => {

      renderError(res, err)

    })

  }

}

export const renderError = (res, err) => {

  if(_.includes(['development'], process.env.NODE_ENV)) console.log(err)

  if(err.name == 'BackframeError') return fail(res, err.code, err.message, { errors: err.errors })

  return fail(res, 500, err.message)

}
