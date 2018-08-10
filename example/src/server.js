import { Backframe, Plugin, Resources, Route, Segment, ExpressTransport } from 'backframe'
import UserSerializer from './serializers/user_serializer'
import knex from './services/knex'
import User from './models/user'

const plugin1 = new Plugin()

plugin1.setName('plugin1')

plugin1.appendBeforeProcessor((req) => console.log('plugin1 before processor'))

plugin1.appendAfterProcessor((req, result) => `${result} plus plugin1`)

const plugin2 = new Plugin({
  name: 'plugin2',
  beforeProcessor: (req) => console.log('plugin2 before processor'),
  afterProcessor: (req, result) => `${result} plus plugin2`
})

const route1 = new Route()

route1.setPath('/a')

route1.appendBeforeProcessor((req) => console.log('route1 before processor'))

route1.appendAfterProcessor((req, result) => `${result} plus route`)

route1.setProcessor((req, trx) => 'route1')

const route2 = new Route({
  method: 'get',
  path: '/b',
  beforeProcessor: () => console.log('route2 before processor'),
  afterProcessor: () => console.log('route2 after processor'),
  processor: (req, trx) => 'route2'
})

const users = new Resources({
  allowedParams: ['first_name','last_name','email','created_at'],
  filterParams: ['id','first_name','last_name','email','created_at'],
  model: User,
  path: '/users',
  memberActions: [
    new Route({
      method: 'patch',
      path: '/activate',
      processor: (req, trx) => 'route2'
    })
  ],
  serializer: UserSerializer,
  sortParams: ['id','first_name','last_name','email'],
})

const segment = new Segment()

segment.setPath('/a')

segment.appendBeforeProcessor(() => console.log('segment before processor'))

segment.appendAfterProcessor((req, result) => `${result} plus segment`)

segment.appendRoute(route1)

segment.appendRoute(route2)

const api = new Backframe({
  knex,
  path: '/api',
  plugins: [
    plugin1,
    plugin2
  ],
  beforeProcessor: () => console.log('backframe before processor'),
  afterProcessor: (req, result) => `${result} plus backframe`,
  segments: [
    users,
    segment
  ]
})

const routes = api.render()

const transport = new ExpressTransport(routes)

transport.listen(3000, () => {

  console.log('Listening on 3000')

})
