import _ from 'lodash'
import Promise from 'bluebird'
import { defaultProcessor, defaultResponder } from '../../utils'
import { validateOptions, defaultOptions } from '../../utils/options'
import { coerceArray, applyToRecords } from '../../utils/core'
import { fail } from '../../utils/response'
import * as constants from '../../constants'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = {
      afterHooks: { type: ['function','function[]'], required: false },
      alterRequest: { type: ['function','function[]'], required: false },
      alterResult: { type: ['function','function[]'], required: false },
      beforeHooks: { type: ['function','function[]'], required: false },
      beginHooks: { type: ['function','function[]'], required: false },
      commitHooks: { type: ['function','function[]'], required: false },
      csvResponder: { type: ['function'], required: false },
      jsonResponder: { type: ['function'], required: false},
      processor: { type: 'function', required: true },
      renderer: { type: 'function', required: false },
      responder: { type: 'function', required: false },
      tsvResponder: { type: ['function'], required: false },
      xlsxResponder: { type: ['function'], required: false },
      xmlResponder: { type: ['function'], required: false }
    }

    validateOptions('handler', userOptions, TYPES)

    const options = normalizeOptions(userOptions, TYPES)

    return buildHandler(options)

  }

}

export const normalizeOptions = (userOptions, types) => {

  return expandLifecycle({
    ...defaultOptions(types),
    ...userOptions,
  })

}

export const expandLifecycle = (userOptions) => {

  return constants.BACKFRAME_HOOKS.reduce((options, hook) => ({
    ...options,
    [hook]: coerceArray(userOptions[hook])
  }), userOptions)

}

export const buildHandler = (components) => {

  const { beginHooks, alterRequest, beforeHooks, processor, afterHooks, renderer, alterResult, responder, commitHooks } = components

  return (req, res) => {

    return new Promise.resolve(req)

    .then((req) => runHooks(req, beginHooks).then(() => req))

    .then((req) => runAlterRequest(req, alterRequest))

    .then((req) => runHooks(req, beforeHooks).then(() => req))

    .then((req) => new Promise((resolve, reject) => processor(req, resolve, reject)).then(result => ([req, result])))

    .then(([req, result]) => runHooks(req, afterHooks, result).then(() => [req, result]))

    .then(([req, result]) => renderer ? new Promise((resolve, reject) => renderer(req, result, resolve, reject)).then(result => ([req, result])) : [req, result])

    .then(([req, result]) => runAlterResult(req, alterResult, result).then(result => ([req, result])))

    .then(([req, result]) => new Promise((resolve, reject) => responder(req, res, result, resolve, reject)).then(() => ([req, result])))

    .then(([req, result]) => runHooks(req, commitHooks, result).then(() => result))

    .catch(err => renderError(res, err))

  }

}

export const runAlterRequest = (req, alterRequest) => {

  const alterer = (req, operation) => new Promise((resolve, reject) => operation(req, resolve, reject))

  if(alterRequest.length === 0) return Promise.resolve(req)

  if(alterRequest.length === 1) return alterer(req, alterRequest[0])

  return Promise.reduce(alterRequest, alterer, req)

}

export const runAlterResult = (req, alterResult, result) => {

  const alterer = (result, operation) => (result && result.records) ? applyToRecords(req, result, operation) : new Promise((resolve, reject) => operation(req, result, resolve, reject))

  if(alterResult.length === 0) return Promise.resolve(result)

  if(alterResult.length === 1) return alterer(result, alterResult[0])

  return Promise.reduce(alterResult, alterer, result)

}

export const runHooks = (req, hooks, result = null) => {

  const runner = (req, result, hook) => new Promise((resolve, reject) => result ? hook(req, result, resolve, reject) : hook(req, resolve, reject))

  if(hooks.length === 0) return Promise.resolve(null)

  if(hooks.length === 1) return runner(req, result, hooks[0])

  return Promise.map(hooks, hook => runner(req, result, hook))

}

export const renderError = (res, err) => {

  if(_.includes(['development'], process.env.NODE_ENV)) console.log(err)

  if(err.code) return fail(res, err.code, err.message, { errors: err.errors })

  return fail(res, 500, err.message)

}
