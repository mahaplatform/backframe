#!/usr/local/bin/node

require('../src/platform/services/environment')

const minimist = require('minimist')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const _ = require('lodash')

process.env.NODE_PATH=path.resolve(__dirname, '../src')
require('module').Module._initPaths()

const camelCase = _.camelCase

const argv = minimist(process.argv.slice(2))
Object.freeze(argv)

const task = argv._[0]
const environment = {
  verbose: argv.v || argv.verbose || false
}

function loadTask(taskIdentifier, env = environment, argv = argv) {

  let segments = taskIdentifier.split(':')
  if(segments.length === 2) {
    segments.unshift('platform')
  }
  let [namespace, task, subtask, modifier] = segments

  let searchPaths = [
    path.resolve(__dirname, `../src/${namespace}/tasks/${task}.js`),
    path.resolve(__dirname, `../src/apps/${namespace}/tasks/${task}.js`)
  ]

  return Promise.all(searchPaths.map(p => fs.statAsync(p).then(() => p).catch(e => null)))
    .then(results => _.compact(results))
    .then(tasks => _.first(tasks))
    .then(task => {
      if(! task) {
        throw `Could not locate task ${taskIdentifier}`
      }
      else {
        return task
      }
    })
    .then(task => executeTask(task, subtask, modifier, env, argv))
}

function executeTask(module, subtask, modifier, env, args) {
  return fs.statAsync(module)
    .then(() => {
      const taskModule = require(module)
      try {
        let localEnv = _.assign({}, environment)
        localEnv.run = (task) => loadTask(task, env, args)
        const result = taskModule[camelCase(subtask)](args, localEnv, modifier)
        return Promise.resolve(result)
      } catch (e) {
        throw 'Task could not be located or executed'
      }
    })
}

loadTask(task, environment, argv)
  .catch(console.error.bind(console))
  .finally(() => process.exit(0))
