require('platform/services/environment')

import express from 'express'
import bodyParser from 'body-parser'
import { loggerBegin, loggerEnd } from 'platform/middleware/logger'
import exceptionHandler from 'platform/middleware/exception_handler'
import notFound from 'platform/middleware/not_found'
import admin from 'admin/server'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(loggerBegin)

app.use(admin)

app.use(notFound)

app.use(exceptionHandler)

app.use(loggerEnd)

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server listening on port', process.env.SERVER_PORT)
})
