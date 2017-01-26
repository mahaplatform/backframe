require('platform/services/environment')

import express from 'express'
import bodyParser from 'body-parser'
import { loggerBegin, loggerEnd } from 'platform/middleware/logger'
import exceptions from 'platform/middleware/exceptions'
import notFound from 'platform/middleware/not_found'
import render from 'platform/middleware/render'
import admin from 'admin/server'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(loggerBegin)

app.use('/api/admin', admin)

app.use(express.static('public'))

app.get('/admin*', render(admin))

app.use(notFound)

app.use(exceptions)

app.use(loggerEnd)

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server listening on port', process.env.SERVER_PORT)
})
