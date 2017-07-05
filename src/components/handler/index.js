import _ from 'lodash'
import { defaultProcessor } from '../../utils'
import { validateOptions, defaultOptions } from '../../utils/options'
import { coerceArray, applyToRecords } from '../../utils/core'
import * as constants from '../../constants'
import { fail } from '../../utils/response'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

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

  const { alterRequest, beforeProcessor, processor, afterProcessor, renderer, alterRecord, responder, afterCommit, beforeRollback } = options

  return (req, res) => {

    return options.knex.transaction(async trx => {

      try {

        req = await runAlterRequest(req, trx, alterRequest) || req

        await runHooks(req, trx, beforeProcessor)

        let result = await processor(req, trx) || null

        await runHooks(req, trx, afterProcessor, result)

        result = renderer ? await renderer(req, trx, result) : result

        result = await runAlterRecord(req, trx, alterRecord, result) || result

        await runResponder(req, res, result, responder)

        await trx.commit(result)

        await runHooks(req, trx, afterCommit, result)

        return result

      } catch(err) {

        await runHooks(req, trx, beforeRollback)

        await trx.rollback(err)

        return renderError(res, err)

      }

    })

  }

}

export const runAlterRequest = (req, trx, alterRequest) => {

  const runner = async (req, operation) => await operation(req, trx)

  if(alterRequest.length === 0) req

  if(alterRequest.length === 1) return runner(req, alterRequest[0])

  return Promise.reduce(alterRequest, runner, req)

}

export const runAlterRecord = (req, trx, alterRecord, result) => {

  if(!alterRecord) return result

  const runner = async (result, operation) => (result && result.records) ? await applyToRecords(req, trx, result, operation) : await operation(req, trx, result)

  if(alterRecord.length === 0) return result

  if(alterRecord.length === 1) return runner(result, alterRecord[0])

  return Promise.reduce(alterRecord, runner, result)

}

export const runHooks = (req, trx, hooks, result = null) => {

  if(!hooks) return true

  const runner = async (hook) => await result ? hook(req, trx, result) : hook(req, trx)

  if(hooks.length === 0) return null

  if(hooks.length === 1) return runner(hooks[0])

  return Promise.map(hooks, hook => runner(hook))

}

export const runResponder = (req, res, result, responder) => {

  if(responder) responder(req, res, result)

}

export const renderError = (res, err) => {

  if(_.includes(['development'], process.env.NODE_ENV)) console.log(err)

  if(err.name == 'BackframeError') return fail(res, err.code, err.message, { errors: err.errors })

  fail(res, 500, err.message)

  return err

}
