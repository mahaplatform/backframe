import Queue from 'bull'
import { beginLogger, endLogger, recordTick, printLogger } from '../../utils/logger'
import { validateOptions, defaultOptions } from '../../utils/options'

export default (backframeOptions = {}) => {

  return (userOptions = {}) => {

    const TYPES = {
      queues: { type: 'object[]', required: false }
    }

    validateOptions('router', userOptions, TYPES)

    const options = normalizeOptions(userOptions, TYPES)

    return buildWorker(options)

  }

}

// normalize and merge defaut options
export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }

}


export const buildWorker = (options) => {

  options.queues.map(queueOptions => {

    const queue = Queue(queueOptions.name, 6379, '127.0.0.1')

    const process = buildProcess(options, queueOptions.handler)

    queue.process(process)

  })

}

const buildProcess = (options, handler) => {

  return (job, done) => {

    console.log('here')

    return Promise.resolve().then(() => {

      return beginLogger(options)()

    }).then(() => {

      return handler(job)

    }).then(result => {

      return endLogger(options)().then(() => result)

    }).then(result => {

      return printLogger(options)(req, res, result)

    }).then(result => {

      return done(null, result)

    })

  }

}
