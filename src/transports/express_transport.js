import bodyParser from 'body-parser'
import express from 'express'
import qs from 'qs'

class ExpressTransport {

  routes = null

  constructor(routes) {

    this.routes = routes

  }

  listen(port, callback) {

    const server = express()

    server.set('query parser', str => qs.parse(str, { arrayLimit: 100 }))

    server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

    server.use(bodyParser.json({ limit: '5mb' }))

    this.routes.map(route => {

      server[route.method](route.path, route.handler)

    })

    server.listen(port, callback)

  }

}

export default ExpressTransport
