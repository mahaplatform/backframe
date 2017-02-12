require('platform/services/environment')

import express from 'express'
import Redis from 'socket.io-redis'
import http from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import exceptions from 'platform/middleware/exceptions'
import notFound from 'platform/middleware/not_found'
import admin from './admin/server'

const app = express()
const transport = http.createServer(app)
const redis = Redis(process.env.REDIS_URL)
const io = socketio(transport)

io.adapter(redis)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(admin)

app.use(express.static('public'))

app.use(notFound)

app.use(exceptions)

transport.listen(process.env.SERVER_PORT, () => {
    console.log('Server listening on port', process.env.SERVER_PORT)
})
