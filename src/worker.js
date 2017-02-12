require('platform/services/environment')

import BullUI from 'bull-ui/app'
import bull from 'bull'
import glob from 'glob'
import path from 'path'

const files = glob.sync(path.resolve(__dirname, '**/jobs/*_job.js'))
files.map(file => {
    const job = require(file)
    const queue = bull(job.queue, process.env.REDIS_URL)
    queue.process(job.process)
})

const app = BullUI({
    redis: process.env.REDIS_URL
})

app.listen(process.env.WORKER_PORT, () => {
    console.log('Worker listening on port', process.env.WORKER_PORT)
})
