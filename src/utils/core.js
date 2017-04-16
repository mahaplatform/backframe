import _ from 'lodash'
import Promise from 'bluebird'
import * as constants from '../constants'
import moment from 'moment'

export const coerceArray = value => {

  return value ? (!_.isArray(value) ? [value] : value) : []

}

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

export const toList = (arr) => {

  return arr.join(', ').replace(new RegExp(',$'), ', and')

}

export const applyToRecords = (req, result, operations) => {

  if(!operations) return Promise.resolve(result)

  const arrayOfOptions = coerceArray(operations)

  return Promise.map(result.records, (record) => {

    return operations.reduce((promise, operation) => {

      return promise.then(record => new Promise((resolve, request) => operation(req, record, resolve, request)))

    }, Promise.resolve(record))

  }).then(records => {

    return {
      ...result,
      records
    }

  })

}

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

// cherry pick fields from a serialized record
export const selectFields = (select) => {

  return (req, record, resolve, reject) => {

    const fields = selectedKeys(select, record)

    const selected = select ? _.pick(record, fields) : record

    resolve(selected)

  }

}

export const selectedLabels = (select, record) => {

  if(_.isPlainObject(select)) return Object.keys(select)

  if(_.isNil(select)) return flattenKeys(record)

  return coerceArray(select)

}

export const selectedKeys = (select, record) => {

  if(_.isPlainObject(select)) return Object.values(select)

  if(_.isNil(select)) return flattenKeys(record)

  return coerceArray(select)

}

export const mergeHooks = (hooks, plugins, options = null) => {

  return coerceArray(plugins).reduce((hooks, plugin) => {

    return constants.BACKFRAME_HOOKS.reduce((hooks, hook) => {

      if(!plugin[hook]) return hooks

      return {
        ...hooks,
        [hook]: [
          ...coerceArray(hooks[hook]),
          ...coerceArray(plugin[hook]).map(hook => options ? hook(options) : hook)
        ]
      }

    }, hooks)

  }, hooks)

}

export const mergeEvents = (events, plugins, options = null) => {

  return coerceArray(plugins).reduce((events, plugin) => {

    return constants.BACKFRAME_EVENTS.reduce((events, event) => {

      if(!plugin[event]) return events

      return {
        ...events,
        [event]: options ? plugin[event](options) : plugin[event]
      }


    }, events)

  }, events)

}

export const mergeTypes = (types, plugins) => {

  return coerceArray(plugins).reduce((types, plugin) => {

    return Object.keys(plugin.options).reduce((types, key) => ({
      ...types,
      [key]: plugin.options[key]
    }), types)

  }, types)

}

export const pluginOptionDefaults = (plugins) => {

  return coerceArray(plugins).reduce((defaults, plugin) => {

    return Object.keys(plugin.options).reduce((defaults, option) => {

      if(!plugin.options[option]) return defaults

      return {
        ...defaults,
        [option]: plugin.options[option].default
      }

    }, defaults)

  }, {})

}
