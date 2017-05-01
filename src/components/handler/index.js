import _ from 'lodash'
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
      alterRecord: { type: ['function','function[]'], required: false },
      beforeHooks: { type: ['function','function[]'], required: false },
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
    responder: defaultResponder('Success')(userOptions),
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

  const { alterRequest, beforeHooks, processor, afterHooks, renderer, alterRecord, responder } = components

  return async (req, res, recordTick = () => Promise.resolve()) => {

    try {

      req = await runAlterRequest(req, alterRequest)

      recordTick('alterRequest')

      await runHooks(req, beforeHooks)

      recordTick('beforeHooks')

      let result = await new Promise((resolve, reject) => processor(req, resolve, reject))

      recordTick('processor')

      await runHooks(req, afterHooks, result)

      recordTick('afterHooks')

      result = await new Promise((resolve, reject) => renderer(req, result, resolve, reject))

      recordTick('renderer')

      result = await runAlterRecord(req, alterRecord, result)

      recordTick('alterRecord')

      result = new Promise((resolve, reject) => responder(req, res, result, resolve, reject))

      recordTick('responder')

      return result

    } catch(err) {

      renderError(res, err)

    }

  }

}

export const runAlterRequest = (req, alterRequest) => {

  const runner = async (req, operation) => await new Promise((resolve, reject) => operation(req, resolve, reject))

  if(alterRequest.length === 0) return Promise.resolve(req)

  if(alterRequest.length === 1) return runner(req, alterRequest[0])

  return Promise.reduce(alterRequest, runner, req)

}

export const runAlterRecord = (req, alterRecord, result) => {

  const runner = async (result, operation) => await (result && result.records) ? applyToRecords(req, result, operation) : new Promise((resolve, reject) => operation(req, result, resolve, reject))

  if(alterRecord.length === 0) return Promise.resolve(result)

  if(alterRecord.length === 1) return runner(result, alterRecord[0])

  return Promise.reduce(alterRecord, runner, result)

}

export const runHooks = (req, hooks, result = null) => {

  const runner = async (req, result, hook) => await new Promise((resolve, reject) => result ? hook(req, result, resolve, reject) : hook(req, resolve, reject))

  if(hooks.length === 0) return Promise.resolve(null)

  if(hooks.length === 1) return runner(req, result, hooks[0])

  return Promise.map(hooks, hook => runner(req, result, hook))

}

export const renderError = (res, err) => {

  if(_.includes(['development'], process.env.NODE_ENV)) console.log(err)

  if(err.code) return fail(res, err.code, err.message, { errors: err.errors })

  return fail(res, 500, err.message)

}
