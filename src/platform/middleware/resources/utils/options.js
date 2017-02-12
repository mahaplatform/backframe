import chalk from 'chalk'
import pluralize from 'pluralize'
import _ from 'lodash'
import { coerceArray } from './index'

const VALID_OPTIONS = ['actions','after','allowedParams','authorizer','alter','before','cacheFor','defaultParams','defaultSort','dependents','except','filterParams','logger','model','name','only','ownedByTeam','ownedByUser','path','pathPrefix','prefix','processor','query','renderer','resources','responder','rights','serializer','softDelete','sortParams','withRelated']
const REQUIRED_OPTIONS = ['name','model']
const MAPPED_OPTIONS = ['alter','after','allowedParams','authorizer','before','logger','processor','query','renderer','responder','rights','serializer','withRelated']
const ARRAY_OR_STRING_OPTIONS = ['allowedParams','defaultSort','except','filterParams','only','sortParams','withRelated']
const OBJECT_OR_FUNCTION_OPTIONS = ['actions','after','authorizer','alter','before','logger','processor','renderer','responder','serializer']
const BOOLEAN_OPTIONS = ['ownedByTeam','ownedByUser','softDelete']
const INTEGER_OPTIONS = ['cacheFor']
const STRING_OPTIONS = ['name','path','pathPrefix','prefix']
const FUNCTION_OPTIONS = ['defaultParams']

// checks the validity of the options and prints errors if not valid
export const validateOptions = (options) => {

  const valid = checkOptions(options)

  const name = options.prefix || options.name || ''

  if(valid !== true) {
    printOptionErrors(name, valid)
    throw(new Error())
  }

}

export const checkValidOptions = (options, valid) => {

  return Object.keys(options).reduce((errors, option) => ([
    ...errors,
    ...(!_.includes(valid, option) ? [`option "${option}" is invalid`] : [])
  ]), [])

}

export const checkRequiredOptions = (options, required) => {

  return required.reduce((errors, option) => ([
    ...errors,
    ...(!options[option] ? [`attribute "${option}" is required`] : [])
  ]), [])

}

export const checkOptionType = (options, names, types) => {

  const getOperation = (type) => {
    if(type === 'array') return _.isArray
    if(type === 'boolean') return _.isBoolean
    if(type === 'function') return _.isFunction
    if(type === 'integer') return _.isInteger
    if(type === 'object') return _.isObject
    if(type === 'string') return _.isString
  }

  const allowed = coerceArray(types)

  return names.reduce((errors, option) => {

    const value = options[option]

    const valid = allowed.reduce((valid, type) => {

      return valid || getOperation(type)(value)

    }, false)


    return [
      ...errors,
      ...(value && !valid ? [`attribute "${option}" must be a ${allowed.join(' or ')}`] : [])
    ]

  }, [])

}

export const checkMappedOptions = (options, mapped) => {

  const customActions = options.actions ? Object.keys(options.actions) : []

  const allowedActions = [
    ...['all','create','destroy','list','show','update'],
    ...customActions
  ]

  return mapped.reduce((errors, option) => {

    if(_.isUndefined(options[option]) || !_.isPlainObject(options[option])) return errors

    const mappedActions = Object.keys(options[option])

    return [
      ...errors,
      ...checkMappedOption(option, mappedActions, allowedActions)
    ]

  }, [])

}

export const checkMappedOption = (option, mappedActions, allowedActions) => {

  return mappedActions.reduce((errors, action) => ([
    ...errors,
    ...(!_.includes(allowedActions, action) ? [`"${option}" maps an invalid action "${action}"`] : [])
  ]), [])

}

export const checkOptions = (options) => {

  const errors = [
    ...checkValidOptions(options, VALID_OPTIONS),
    ...checkRequiredOptions(options, REQUIRED_OPTIONS),
    ...checkMappedOptions(options, MAPPED_OPTIONS),
    ...checkOptionType(options, ARRAY_OR_STRING_OPTIONS, ['array','string']),
    ...checkOptionType(options, OBJECT_OR_FUNCTION_OPTIONS, ['object','function']),
    ...checkOptionType(options, BOOLEAN_OPTIONS, 'boolean'),
    ...checkOptionType(options, STRING_OPTIONS, 'string'),
    ...checkOptionType(options, INTEGER_OPTIONS, 'integer'),
    ...checkOptionType(options, FUNCTION_OPTIONS, 'function')
  ]

  return (errors.length === 0) ? true : errors

}

export const printOptionErrors = (name, issues) => {

  [
    chalk.red('================================================================================'),
    chalk.white(`Unable to build resource '${name}'`),
    chalk.red('================================================================================'),
    chalk.white('We found the following problems with your configuration:'),
    ...issues.map(issue => chalk.grey('> ' + issue)),
    chalk.red('================================================================================')
  ].map(statement => console.log(statement))

}

export const normalizeOptions = (userOptions) => {

  const defaultOptions = {
    actions: [],
    defaultSort: '-created_at',
    ownedByTeam: true,
    ownedByUser: false,
    primaryKey: 'id',
    resources: [],
    softDelete: false
  }

  return {
    ...defaultOptions,
    ...userOptions,
    alter: mapOptionToActions(userOptions.alter),
    after: mapOptionToActions(userOptions.after),
    allowedParams: mapOptionToActions(userOptions.allowedParams),
    authorizer: mapOptionToActions(userOptions.authorizer),
    before: mapOptionToActions(userOptions.before),
    logger: mapOptionToActions(userOptions.logger),
    path: userOptions.path || pluralize(userOptions.name),
    processor: mapOptionToActions(userOptions.processor),
    query:  mapOptionToActions(userOptions.query),
    renderer: mapOptionToActions(userOptions.renderer),
    responder: mapOptionToActions(userOptions.responder),
    rights: mapOptionToActions(userOptions.rights),
    serializer: mapOptionToActions(userOptions.serializer),
    withRelated: mapOptionToActions(userOptions.withRelated)
  }

}

// maps a single value to all if the value is not already mapped to one or more
// actions
export const mapOptionToActions = (value) => {

  return value ? (_.isObject(value) && (value.all || value.create || value.update || value.destroy || value.show || value.list) ? value : { all: value }) : {}

}
