import _ from 'lodash'
import { defaultProcessor, defaultResponder } from '../../utils'
import { validateOptions, defaultOptions } from '../../utils/options'
import { coerceArray, applyToRecords } from '../../utils/core'
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

    const options = normalizeOptions(userOptions, backframeOptions, TYPES)

    return buildHandler(options)

  }

}

export const normalizeOptions = (userOptions, backframeOptions, types) => {

  return expandLifecycle({
    ...defaultOptions(types),
    responder: defaultResponder('Success')(userOptions),
    ...backframeOptions,
    ...userOptions,
  })

}

export const expandLifecycle = (userOptions) => {

  return constants.BACKFRAME_HOOKS.reduce((options, hook) => ({
    ...options,
    [hook]: coerceArray(userOptions[hook])
  }), userOptions)

}

export const buildHandler = (options) => {

  const { alterRequest, beforeHooks, processor, afterHooks, renderer, alterRecord, responder } = options

  return async (req, res, recordTick = () => Promise.resolve()) => {

    req = await runAlterRequest(req, alterRequest)

    recordTick('alterRequest')

    await runHooks(req, beforeHooks)

    recordTick('beforeHooks')

    let result = await processor(req)

    recordTick('processor')

    await runHooks(req, afterHooks, result)

    recordTick('afterHooks')

    result = renderer ? await renderer(req, result) : result

    recordTick('renderer')

    result = await runAlterRecord(req, alterRecord, result)

    recordTick('alterRecord')

    await responder(req, res, result)

    recordTick('responder')

    return result

  }

}

export const runAlterRequest = (req, alterRequest) => {

  const runner = async (req, operation) => await operation(req)

  if(alterRequest.length === 0) req

  if(alterRequest.length === 1) return runner(req, alterRequest[0])

  return Promise.reduce(alterRequest, runner, req)

}

export const runAlterRecord = (req, alterRecord, result) => {

  const runner = async (result, operation) => await (result && result.records) ? applyToRecords(req, result, operation) : operation(req, result)

  if(alterRecord.length === 0) return result

  if(alterRecord.length === 1) return runner(result, alterRecord[0])

  return Promise.reduce(alterRecord, runner, result)

}

export const runHooks = (req, hooks, result = null) => {

  const runner = async (req, result, hook) => await result ? hook(req, result) : hook(req)

  if(hooks.length === 0) return null

  if(hooks.length === 1) return runner(req, result, hooks[0])

  return Promise.map(hooks, hook => runner(req, result, hook))

}
