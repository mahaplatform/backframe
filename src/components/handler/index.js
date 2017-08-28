import { validateOptions, defaultOptions } from '../../utils/options'
import { coerceArray, applyToRecords } from '../../utils/core'
import { defaultProcessor } from '../../utils'
import * as constants from '../../constants'
import { fail } from '../../utils/response'
import chalk from 'chalk'
import _ from 'lodash'

export default (backframeOptions = {}) => (userOptions = {}) => {

  const TYPES = {
    afterCommit: { type: ['function','function[]'], required: false },
    afterProcessor: { type: ['function','function[]'], required: false },
    alterRequest: { type: ['function','function[]'], required: false },
    alterRecord: { type: ['function','function[]'], required: false },
    beforeProcessor: { type: ['function','function[]'], required: false },
    beforeRollback: { type: ['function','function[]'], required: false },
    csvResponder: { type: ['function'], required: false },
    jsonResponder: { type: ['function'], required: false},
    handler: { type: 'function', required: false },
    processor: { type: 'function', required: false },
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

export const normalizeOptions = (userOptions, backframeOptions, types) => {

  return expandLifecycle({
    ...defaultOptions(types),
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

  return async (req, res) => {

    if(process.env.NODE_ENV === 'test') return await withTransaction(req, res, null, options)

    return await options.knex.transaction(async trx => await withTransaction(req, res, trx, options))

  }

}

const withTransaction = async (req, res, trx, options) => {

  const { alterRequest, beforeProcessor, processor, afterProcessor, renderer, alterRecord, responder, afterCommit, beforeRollback } = options

  try {

    req = await runAlterRequest(req, trx, options, alterRequest) || req

    await runHooks(req, trx, options, beforeProcessor, false)

    let result = await processor(req, trx, options) || null

    await runHooks(req, trx, options, afterProcessor, result)

    result = renderer ? await renderer(req, trx, result, options) : result

    result = await runAlterRecord(req, trx, options, alterRecord, result) || result

    await runResponder(req, res, options, result, responder)

    if(trx) await trx.commit(result)

    await runHooks(req, trx, options, afterCommit, result)

    return result

  } catch(err) {

    console.error(err.stack)

    await runHooks(req, trx, options, beforeRollback)

    if(trx) await trx.rollback(err)

    return renderError(res, err)

  }

}

export const runAlterRequest = (req, trx, options, alterRequest) => {

  const runner = async (req, operation) => await operation(req, trx, options)

  if(alterRequest.length === 0) req

  if(alterRequest.length === 1) return runner(req, alterRequest[0])

  return Promise.reduce(alterRequest, runner, req)

}

export const runAlterRecord = (req, trx, options, alterRecord, result) => {

  if(!alterRecord) return result

  const runner = async (result, operation) => (result && result.records) ? await applyToRecords(req, trx, result, operation, options) : await operation(req, trx, result, options)

  if(alterRecord.length === 0) return result

  if(alterRecord.length === 1) return runner(result, alterRecord[0])

  return Promise.reduce(alterRecord, runner, result)

}

export const runHooks = (req, trx, options, hooks, result) => {

  if(!hooks) return true

  const runner = async (hook) => await result === false ? hook(req, trx, options) : hook(req, trx, result, options)

  if(hooks.length === 0) return null

  if(hooks.length === 1) return runner(hooks[0])

  return Promise.map(hooks, hook => runner(hook))

}

export const runResponder = (req, res, options, result, responder) => {

  if(responder) responder(req, res, result, options)

}

export const renderError = (res, err) => {

  if(err.name == 'BackframeError') return fail(res, err.code, err.message, { errors: err.errors })

  fail(res, 500, err.message)

  return err

}
