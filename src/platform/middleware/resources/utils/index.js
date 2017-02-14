import _ from 'lodash'
import Promise from 'bluebird'
import { Router } from 'express'
import knex from 'platform/services/knex'
import cache from '../helpers/cache'
import { succeed, fail } from 'platform/utils/responses'
import { validateOptions, normalizeOptions } from './options'
import custom from '../actions/custom'
import log from '../helpers/log'
import chalk from 'chalk'
import moment from 'moment'

// throughout the api, we need to ensure that a value is an array, this function
// takes a value and wraps it with an array if its not already one
export const coerceArray = value => {

  return value ? (!_.isArray(value) ? [value] : value) : []

}

// takes a varying number of arrays and merges the values into a single array,
// removing duplicates in the process
export const mergeParams = function() {

  return Array.apply(null, { length: arguments.length }).reduce((merged, value, index) => _.uniq([
    ...merged,
    ...coerceArray(arguments[index])
  ]), [])

}

// returns a flat list of all the nested keys in a hash
export const flattenKeys = (hash, prefix = '') => {

  return Object.keys(hash).reduce((keys, key) => [
    ...keys,
    ..._.isObject(hash[key]) ? flattenKeys(hash[key], `${prefix}${key}.`) : [`${prefix}${key}`]
  ], [])

}

// analyzes only and exclude options and determines which of the default actions
// should be included in the routing table
export const includeAction = (action, only, except) => {

  if(only) {
    const included = coerceArray(only)
    if(!_.includes(included, action)) {
      return false
    }
  } else if(except) {
    const excluded = coerceArray(except)
    if(_.includes(excluded, action)) {
      return false
    }
  }

  return true

}

// takes a builder function and assembles each actor into a promise chain,
// wrapped in a transaction
export const buildHandler = (action, builder, options) => {

  const before = mergeParams(options.before.all, options.before[action])

  const after = mergeParams(options.after.all, options.after[action])

  const alter = mergeParams(options.alter.all, options.alter[action])

  const rights = mergeParams(options.rights.all, options.rights[action])

  const defaults = builder(options)

  const { authorizer, processor, renderer, responder, logger } = buildHandlerComponents(options, action, defaults.authorizer, defaults.processor, defaults.renderer, defaults.responder, defaults.logger)

  const authenticator = resourceAuthenticator(options, rights)

  return (req, res, next) => {

    const withHooks = () => wrapWithHooks(authenticator, authorizer, before, processor, after, logger, renderer, alter, responder, req, res, next)

    const withTransaction = () => wrapWithTransaction(withHooks)

    return wrapWithLogger(req, res, withTransaction)

  }

}

// takes all actor components and assembles them into a promise chain
export const wrapWithHooks = (authenticator, authorizer, before, processor, after, logger, renderer, alter, responder, req, res, next) => {

  return new Promise((resolve, reject) => resolve()).then(() => {

    return authenticator ? authenticator(req) : true

  }).then(() => {

    return authorizer ? authorizer(req).catch(err => { throw(new Error(err)) }) : true

  }).then(() => {

    return runHooks(req, before)

  }).then(() => {

    return processor ? processor(req) : true

  }).then(result => {

    return runHooks(req, after, result).then(() => result)

  }).then(result => {

    return logger ? logger(req, result) : result

  }).then(result => {

    return renderer ? renderer(req, result) : result

  }).then(result => {

    return runHooks(req, alter, result)

  }).then(result => {

    if(responder) responder(req, res, next, result)

    return true

  }).catch(err => {

    if(_.isPlainObject(err)) {

      const extra = err.errors ? { errors: err.errors } : null

      fail(res, err.code, err.message, extra)

      return false

    }

    if(process.env.NODE_ENV === 'development') console.log(err)

    fail(res, 500, err.message)

    return false

  })

}

// takes an operation and executes it for every item in the records item in
// an object
export const applyToRecords = (req, result, operations) => {

  return Promise.all(result.records.map(record => {

    return Promise.reduce(coerceArray(operations), (result, operation) => {
      return operation(req, result)
    }, record)

  })).then(records => {

    return {
      ...result,
      records
    }

  })

}

// sequentially executes each hook, passing the result from hook to hook
export const runHooks = (req, hooks, result = null) => {

  if(!hooks || hooks.length === 0) return new Promise((resolve, reject) => resolve(result))

  return Promise.reduce(coerceArray(hooks), (result, hook) => {

    if(result) {
      return result.records ? applyToRecords(req, result, hook) : hook(req, result)
    }

    return hook(req)

  }, result).catch(err => {

    const error = (_.isString(err)) ? new Error(err) : err

    throw(error)

  })

}

// wrap a handler promise chain within a knex transaction
export const wrapWithTransaction = (handler) => {

  return knex.raw('BEGIN TRANSACTION').then(() => {

    return handler()

  }).then(success => {

    if(!success) {
      return knex.raw('ROLLBACK TRANSACTION')
    }

    return knex.raw('COMMIT TRANSACTION')

  })

}

export const wrapWithLogger = (req, res, handler) => {

  const started = moment()

  return new Promise((resolve, reject) => resolve()).then(() => {

    return handler()

  }).then(() => {

    console.log('=========================================================')
    console.log('%s %s', chalk.red(req.method), req.path)
    console.log('=========================================================')
    if(!_.isEmpty(req.params)) console.log('%s %s', chalk.red('PARAMS:'), JSON.stringify(req.params))
    if(!_.isEmpty(req.query))  console.log('%s %s', chalk.red('QUERY:'), JSON.stringify(req.query))
    if(!_.isEmpty(req.body))   console.log('%s %s', chalk.red('BODY:'), JSON.stringify(req.body))
    if(req.team)         console.log('%s %s', chalk.red('TEAM:'), req.team.get('title'))
    if(req.user)         console.log('%s %s', chalk.red('USER:'), req.user.get('full_name'))
    console.log('%s %s rendered in %sms', chalk.red('RESPONSE:'), res.statusCode, moment().diff(started, 'milliseconds'))
    console.log('=========================================================')

  })

}

export const defaultQuery = (req, options, action, qb, filters) => {

  const tableName = options.model.extend().__super__.tableName

  if(options.ownedByTeam) {
    qb = qb.where(`${tableName}.team_id`, req.user.get('id'))
  }

  if(options.ownedByUser) {
    qb = qb.where(`${tableName}.user_id`, req.user.get('id'))
  }

  const query = options.query.list || options.query.all

  if(query) {
    query(qb, req, filters)
  }

  if(options.softDelete) {
    qb = qb.whereNull('deleted_at')
  }

  return qb

}

// return body params with only requested keys
export const filterParams = (params, allowed) => {

  if(!params) return null

  return _.pick(params, allowed)

}

// optionally pass a record through a serializer or return standard toJSON
// method on model
export const serializeRecord = (record, serializer) => {

  return new Promise((resolve, reject) => resolve()).then(() => {

    return serializer ? serializer(record) : record.toJSON()

  })

}

// default authenticator for resources
export const resourceAuthenticator = (options, rights) => {

  return (req) => {

    return new Promise((resolve, reject) => {

      const allowed = rights.reduce((allowed, right) => {

        if(!allowed) return false

        return _.includes(req.rights, right)

      }, true)

      if(!allowed) reject({ code: 403, message: 'You do not have the rights to access this resource.' })

      resolve()

    })

  }

}
// default renderer for resources
export const resourceRenderer = (serializer, options) => {

  return (req, resource) => {

    const serialize = () => serializeRecord(resource, serializer)

    if(options.cacheFor) {

      const key = `${options.name}-${resource.get('id')}-${resource.get('updated_at')}`

      return cache(key, options.cacheFor, serialize)

    }

    return serialize()

  }

}

// default responder for resources
export const resourceResponder = (status, message) => {

  return (req, res, next, data) => {

    return succeed(res, status, message, { data })

  }

}

// default logger for resources
export const resourceLogger = text => {

  return (req, result) => {

    const activity = result.get('activity')

    return activity ? log(req, text, activity.type, activity.text).then(() => result) : result

  }

}

// override default components with custom componets from option hash
export const buildHandlerComponents = (options, action, authorizer, processor, renderer, responder, logger) => ({
  authorizer: options.authorizer.all || options.authorizer[action] || authorizer,
  processor: options.processor.all || options.processor[action] || processor,
  renderer: options.renderer.all || options.renderer[action] || renderer,
  responder: options.responder.all || options.responder[action] || responder,
  logger: options.logger.all || options.logger[action] || logger
})

// build routing hash from options
export const buildRoutes = (userOptions) => {

  validateOptions(userOptions)

  const options = normalizeOptions(userOptions)

  const prefix = options.prefix ? `${options.prefix}_` : `${options.name}_`

  const pathPrefix = options.pathPrefix || ''

  return {
    ...buildCustomRoutes(options, prefix, pathPrefix),
    ...buildStandardRoutes(options, prefix, pathPrefix),
    ...buildNestedRoutes(options, prefix, pathPrefix)
  }

}

// build a standard route
export const buildStandardRoutes = (options, prefix, pathPrefix) => {

  const routes = [
    { name: 'list', method: 'get', path: '(\.:ext)?' },
    { name: 'create', method: 'post', path: '' },
    { name: 'show', method: 'get', path: '/:id' },
    { name: 'edit', method: 'get', path: '/:id/edit' },
    { name: 'update', method: 'patch', path: '/:id' },
    { name: 'destroy', method: 'delete', path: '/:id' }
  ]

  return routes.reduce((routes, route) => ({
    ...routes,
    ...(includeAction(route.name, options.only, options.except) ? {
      [`${prefix}${route.name}`]: {
        method: route.method,
        path: `${pathPrefix}/${options.path}${route.path}`,
        handler: buildHandler(route.name, require(`../actions/${route.name}`).default, options)
      }
    } : {})
  }), {})

}

// build a custom route
export const buildCustomRoutes = (options, prefix, pathPrefix) => {

  return Object.keys(options.actions).reduce((routes, name) => {

    const action = options.actions[name]

    const builder = action.builder || custom(name, action)

    return {
      ...routes,
      [`${prefix}${name}`]: {
        method: action.method,
        path: (action.on === 'collection') ? `${pathPrefix}/${options.path}/${action.path}` : `${pathPrefix}/${options.path}/:id/${action.path}`,
        handler: buildHandler(name, builder, options)
      }
    }

  }, {})

}

// build a nested routing hash
export const buildNestedRoutes = (options, prefix, pathPrefix) => {

  return options.resources.reduce((routes, resource) => ({
    ...routes,
    ...buildRoutes({
      ...resource,
      pathPrefix: `${pathPrefix}/${options.path}/:${options.name}_id`,
      prefix: `${prefix}${resource.name}`
    })
  }), {})

}

// maps a routing hash to an express router
export const buildRouter = routes => {

  return Object.keys(routes).reduce((router, key) => {

    const route = routes[key]

    router[route.method](route.path, route.handler)

    return router

  }, Router({ mergeParams: true }))

}


// maps a routing hash to a routing table
export const buildRoutingTable = routes => {

  return Object.keys(routes).reduce((table, key) => {

    const route = routes[key]

    return [
      ...table,
      _.pick(route, ['method', 'path'])
    ]

  }, [])

}

// pads a string with spaces
export const padString = (text, length) => {

  return text + '                        '.slice(0, length - text.length)

}

// print a routing table
export const printRoutingTable = (resources, method) => {

  console.log(chalk.grey(' ============================================================= '))
  console.log('%s %s %s %s %s', chalk.grey('|'), chalk.white(padString('METHOD', 6)),chalk.grey('|'), chalk.white(padString('PATH', 50)),chalk.grey('|'))
  console.log(chalk.grey('|=============================================================|'))

  resources.map(resource => {

    Object.keys(resource.routes).map(key => {

      const route = resource.routes[key]

      if(method !== 'all' && method !== route.method) return

      console.log('%s %s %s %s %s', chalk.grey('|'), chalk.green(padString(route.method.toUpperCase(), 6)),chalk.grey('|'), chalk.white(padString(route.path, 50)),chalk.grey('|'))

    })

  })

  console.log(chalk.grey(' ============================================================= '))
  console.log()

}
