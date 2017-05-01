import express from 'express'
import { queue, worker } from 'app/services/backframe'

const queues = [
  queue({
    name: 'foo',
    handler: (job) => {
      console.log('foo')
    }
  })
]

worker({ queues })
