<table>
  <tr>
    <td>Build Status</td>
    <td>
      <a href="https://circleci.com/gh/thinktopography/backframe">
        <img src="https://img.shields.io/circleci/project/thinktopography/backframe.svg?maxAge=600" alt="Build Status" >
      </a>
    </td>
  </tr>
  <tr>
    <td>Code Quality</td>
    <td>
      <a href="https://codeclimate.com/github/thinktopography/reframe">
        <img src="https://img.shields.io/codeclimate/github/thinktopography/backframe.svg?maxAge=600" alt="Code Climate" />
      </a>
      <a href="https://codeclimate.com/github/thinktopography/backframe/coverage">
        <img src="https://img.shields.io/codeclimate/coverage/github/thinktopography/backframe.svg?maxAge=600" alt="Code Coverage" />
      </a>
    </td>
  </tr>
</table>

# Backframe
Backframe is a javascript library for declaratively creating REST APIs for
Express. Express is a great tool for building lightweight web and application
servers, but it leaves almost all of the implementation to the developer. When
building REST API's, this usually ends up requiring the developer to write
a lot of tedious and repetitive code. Backframe provides simple, declarative
tools for building REST APIs.

[Read the overview](https://github.com/thinktopography/backframejs/blob/master/docs/overview.md)

## Installation
Install with [npm](http://npmjs.com) or [yarn](https://yarnpkg.com):

```sh
npm install --save backframe
```

## Usage
Using backframe in your application is easy:

```javascript
import express from 'express'
import { router, resources } from 'backframe'
import Kittens from from 'app/models/kittens'

const kittens = resources({
  model: Kittens,
  name: 'kittens'
})

const app = express()

app.use(router({
  routes: kittens
}))

app.listen(3000)
```

## Handlers
The fundamental actor in a Backframe application is the handler. A handler is a
function that performs an atomic unit of work. A handler has the signature `(req, res) => {}`
and can be used within an Express middleware. Although Backframe is primarily
intended to build handlers for Express, these function can be used outside of
Express as well in the context of a worker or some other asynchronous process.

[Learn more about handlers](https://github.com/thinktopography/backframejs/blob/master/docs/handler.md)

## Resources
At the core of most REST APIs is the concept of a resource or a collection of
resources. Backframe provides a convenient factory for creating a series of
endpoints for each resource in your application.

[Learn more about resources](https://github.com/thinktopography/backframejs/blob/master/docs/resources.md)

## Segments
In order to handle routes and resources collectively, routes can be grouped into
one or more nested segments. Segments can be nested as deeply as needed allowing
attributes to be applied in batch to any level of the hierarchy.

[Learn more about segments](https://github.com/thinktopography/backframejs/blob/master/docs/segment.md)

## Routers
In most cases, you will want to use Backframe to within Express as a middleware
router. The Backframe router component enables you to wrap a routing segment
with an Express router and mount it within your application.

[Learn more about routers](https://github.com/thinktopography/backframejs/blob/master/docs/router.md)

## Plugins
Backframe has a plugin framework that enables developers to extend or decorate
the lifecycle of a Backframe handler with supplemental functionality through
the addition of one or more hooks. Plugins can also define their own configuration
options to be invoked when constructing Backframe objects.

[Learn more about plugins](https://github.com/thinktopography/backframejs/blob/master/docs/plugin.md)

## Author & Credits

Backframe was originally written by [Greg Kops](https://github.com/mochini) and
is based upon his work with [Think Topography](http://thinktopography.com),
[Funkhaus](http://funkhaus.us) and [The Cornell Cooperative Extension of Tompkins County](http://ccetompkins.org)
