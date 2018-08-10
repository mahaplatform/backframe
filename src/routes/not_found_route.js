import BackframeError from '../error'
import Route from '../route'

const NotFoundRoute = new Route({
  method: 'use',
  path: '*',
  processor: (req, trx, options) => {
    throw new BackframeError({ code: '404', message: 'Route not Found' })
  }
})

export default NotFoundRoute
