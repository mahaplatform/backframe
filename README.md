# Backframe
Backframe is a javascript library for declaratively creating REST APIs for
Express. Express is a great tool for building lightweight web and application
servers, but it leaves almost all of the implementation to the developer. When
building REST API's, this usually ends up requiring the developer to write
a lot of repetitive code. Backframe provides simple, declarative tools for
building REST APIs.

## Handler
The fundamental actor in a Backframe application is the handler. A handler is a
function that performs an atomic unit of work. A handler has the signature `(req, res) => {}`
and can be used within an Express middleware. Although Backframe is primarily
intended to build handlers for expres, these function can be used outside of
Express as well in the context of a worker or some other asynchronous process.

A Backframe handler observes the following sequence of lifecyle events:

| EVENT          | DESCRIPTION
|----------------|--------------------------------------------------------------------|
| beginHooks[]   | An array of functions to be executed at the beginning of a handler |
| alterRequest[] | An array of functions to mutate or add to the request object       |
| beforeHooks[]  | An array of functions to be executed before the processor          |
| processor      | A function that performs the work and returns a result             |
| afterHooks[]   | An array of functions to be executed after the processor           |
| renderer       | A function to render the result                                    |
| alterResult[]  | An array of functions to alter the result                          |
| responder      | A function to convert the result into a response object            |
| commitHooks[]  | An array of functions to be executed at the end of a handler       |

All functions are promise based and either resolve successfully or reject with
an error code and message that can be displayed to the user or written to a log

## Resources
At the core of most REST APIs is the concept of a resource or a collection of
resources. Backframe provides a convenient factory for creating a series of
endpoints for each resource in your application. By default a resource generates
the following endpoints

| ENDPOINT | METHOD | DESCRIPTION                                                          |
|----------|--------|----------------------------------------------------------------------|
| list     | GET    | returns a pageable, filterable, and sortable collection of resources |
| show     | GET    | return a single resource                                             |
| create   | POST   | create a new resource                                                |
| edit     | GET    | return a flat view of a resource                                     |
| update   | PATCH  | updates an existing resource                                         |
| destroy  | DELETE | deletes an existing resource                                         |

## Segments
In order to handle routes and resources collectively, routes can be grouped into
one or more nested segments. Segments can be nested as deeply as needed allowing
attributes to be applied in batch to any level of the hierarchy. For example,

```Javascript
import { resources, segment } from 'backframe'

const users = resources({
  model: User,
  name: 'user'
})

const admin = segment({
  authenticated: true,
  pathPrefix: '/admin',
  routes: [
    users
  ]
})

const pages = resources({
  model: Page,
  name: 'page'
})

const website = segment({
  routes: [
    admin,
    pages
  ]
})
```

produces the following routing table:

| PATH                  | METHOD | AUTHENTICATED  |
|-----------------------|--------|----------------|
| /admin/users          | GET    | TRUE           |
| /admin/users          | POST   | TRUE           |
| /admin/users/:id      | GET    | TRUE           |
| /admin/users/:id/edit | GET    | TRUE           |
| /admin/users/:id      | PATCH  | TRUE           |
| /admin/users/:id      | DELETE | TRUE           |
| /pages                | GET    | FALSE          |
| /pages                | POST   | FALSE          |
| /pages/:id            | GET    | FALSE          |
| /pages/:id/edit       | GET    | FALSE          |
| /pages/:id            | PATCH  | FALSE          |
| /pages/:id            | DELETE | FALSE          |

## Router
In most cases, you will want to use Backframe to within Express as a middleware
router. The Backframe router component enables you to wrap a routing segment
with an Express router and mount it within your application.

```Javascript
import { router } from 'backframe'

const app = Express()

app.use(router({
  cors: true,
  notFound: true,
  routes: website
}))

app.listen(3000)
```

## Plugins
Backframe has a plugin framework that enables developers to extend or decorate
the lifecycle of a Backframe handler with supplemental functionality through
the addition of one or more hooks. Plugins can also define their own configuration
options to be invoked when constructing Backframe objects.

```Javascript
import { plugin } from 'backframe'

const beginHooks = options => (req, resolve, reject) => {
  console.log('beginning handler')
  resolve()
}

const alterRequest = options => (req, resolve, reject) => {
  console.log('altering request')
  resolve(req)
}

const beforeHooks = options => (req, resolve, reject) => {
  console.log('before processor')
  resolve()
}

const afterHooks = options => (req, result, resolve, reject) => {
  console.log('after processor')
  resolve()
}

const alterResult = options => (req, result, resolve, reject) => {
  console.log('altering response')
  resolve(result)
}

const commitHooks = options => (req, result, resolve, reject) => {
  console.log('finishing handler')
  resolve()
}

export default plugin({
  options: {
    option1: {
      type: 'boolean',
      default: true,
      required: true
    },
    option2: {
      type: ['function','function[]'],
      default: null,
      required: false
    }
  },
  beginHooks,
  alterRequest,
  beforeHooks,
  afterHooks,
  alterRequest,
  commitHooks
})
```
