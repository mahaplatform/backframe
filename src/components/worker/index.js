import PriorityQueue from 'bull'
import _ from 'lodash'
import { validateOptions, defaultOptions } from '../../utils/options'
import { mergeEvents, mergeHooks } from '../../utils/core'
import buildHandler from '../handler'
import * as constants from '../../constants'
import { beginLogger, endLogger, recordTick, printQueue } from '../../utils/logger'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = {
      queues: { type: 'object[]', required: false }
    }

    validateOptions('worker', userOptions, TYPES)

    const options = normalizeOptions(userOptions, TYPES)

    return buildWorker(backframeOptions, options, buildHandler(backframeOptions))

  }

}

export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }

}

// iterate through routing array and configure all events and hooks with
// accumuated routeOptions
const renderHandler = (plugins, queue) => {

  return {
    ...mergeHooks({}, [ ...plugins, queue.handler ], queue.options),
    ...mergeEvents({}, [ ...plugins, queue.handler ], queue.options)
  }

}

// iterate through routing array and generate express router
export const buildWorker = (backframeOptions, options, buildHandler) => {

  const config = {
    redis: {
      url: process.env.REDIS_URL
    }
  }

  return options.queues.reduce((queues, queue) => {

    const handler = buildHandler(renderHandler(backframeOptions.plugins, queue))

    const newQueue = new PriorityQueue(queue.options.name, config)

    newQueue.process(buildProcess(queue.options, handler))

    return {
      ...queues,
      [queue.options.name]: newQueue
    }

  }, {})

}

const buildProcess = (options, handler) => {

  return async (job, done) => {

    beginLogger(options)()

    const result = await handler(job, {}, recordTick)

    console.log(result)

    endLogger(options)()

    printQueue(options)(job, result)

    done(result)

  }

}
