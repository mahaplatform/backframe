require('platform/services/environment')

import { setup, teardown } from 'platform/utils/db'
const config = require('../knexfile')
const Knex = require('knex')
const knex = new Knex(config[process.env.NODE_ENV])

before(function(done) {
  setup().then(() => {
    done()
  })
})

beforeEach(function(done) {
  knex.raw('BEGIN TRANSACTION').then(() => {
    done()
  })
})

afterEach(function (done) {
  knex.raw('ROLLBACK').then(() => {
    done()
  })
})

after(function(done) {
  teardown().then(() => {
    done()
  })
})
