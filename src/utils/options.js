import chalk from 'chalk'
import _ from 'lodash'
import { coerceArray, toList } from './core'
import BackframeError from './error'

export const validateOptions = (type, options, definitions) => {

  const valid = checkOptions(options, definitions)

  const name = options.name || options.path || ''

  if(valid !== true) {

    if(process.env.NODE_ENV === 'development') {
      printOptionErrors(type, name, valid)
    }

    throw(new Error())

  }

}

export const checkOptions = (options, definitions) => {

  const errors = Object.keys(definitions).reduce((errors, key) => {

    const customActions = options.actions ? Object.keys(options.actions) : []

    const allowedActions = [
      ...['all','create','destroy','list','show','update'],
      ...customActions
    ]

    const definition = definitions[key]

    const option = options[key]

    const error = [

    ]

    return [
      ...errors,
      ...checkTypes(option, key, definition.type, allowedActions),
      ...checkRequired(option, key, definition.required)
    ]

  }, [])

  return (errors.length === 0) ? true : errors

}

// check if each option matches the specified types
export const checkTypes = (option, key, types, allowedActions) => {

  if(!option) return []

  const valid = coerceArray(types).reduce((valid, type) => {

    return valid || checkType(option, type, allowedActions)

  }, false)

  return (!valid) ? [`attribute "${key}" must be of type ${coerceArray(types).join(' or ')}`] : []

}

// recursively check if option matches the specified type
export const checkType = (option, type, allowedActions) => {

  const array = type.match(/^(\w*)\[\]$/)

  const mapped = type.match(/^(\w*)\{\}$/)

  if(array && _.isArray(option)) {

    return option.reduce((valid, value) => {

      if(!valid) return valid

      return checkType(value, array[1], allowedActions)

    }, true)

  } else if(mapped && _.isPlainObject(option)) {

    return Object.keys(option).reduce((valid, key) => {

      if(!valid) return valid

      const value = option[key]

      return _.includes(allowedActions, key) && checkType(value, mapped[1], allowedActions)

    }, true)

  } else if(!array && !mapped) {

    return getOperation(type)(option)

  }

  return false

}

// check if each required option is set
export const checkRequired = (option, key, required) => {

  return required && _.isNil(option) ? [`attribute "${key}" is required`] : []

}

// helper fuction for evaluating type of option
export const getOperation = (type) => {
  if(type === 'array') return _.isArray
  if(type === 'boolean') return _.isBoolean
  if(type === 'function') return _.isFunction
  if(type === 'integer') return _.isInteger
  if(type === 'object') return _.isObject
  if(type === 'string') return _.isString
}

// extract option defualts
export const defaultOptions = (types) => {

  return Object.keys(types).reduce((defaults, type) => ({
    ...defaults,
    ...types[type].default ? { [type]: types[type].default } : {}
  }), {})

}

export const checkPermitted = (keys, permitted, message) => {

  if(process.env.NODE_ENV != 'development') return true

  const unpermitted = Object.keys(keys).filter(key => {
    return !_.includes(coerceArray(permitted), key)
  })

  if(unpermitted.length > 0) {
    throw new BackframeError({ code: 412, message: message.replace('{unpermitted}', toList(unpermitted)) })
  }

}

export const printOptionErrors = (type, name, issues) => {

  [
    chalk.red('================================================================================'),
    chalk.white(`Unable to build ${type} '${name}'`),
    chalk.red('================================================================================'),
    chalk.white('We found the following problems with your configuration:'),
    ...issues.map(issue => chalk.grey('> ' + issue)),
    chalk.red('================================================================================')
  ].map(statement => console.log(statement))

}
