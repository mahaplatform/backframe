
# Backframe
<a href="https://circleci.com/gh/mahaplatform/backframe">
  <img src="https://img.shields.io/circleci/project/mahaplatform/backframe.svg?maxAge=600" alt="Build Status" >
</a>
<a href="https://codeclimate.com/github/mahaplatform/backframe">
  <img src="https://img.shields.io/codeclimate/github/mahaplatform/backframe.svg?maxAge=600" alt="Code Climate" />
</a>
<a href="https://codeclimate.com/github/mahaplatform/backframe/coverage">
  <img src="https://img.shields.io/codeclimate/coverage/github/mahaplatform/backframe.svg?maxAge=600" alt="Code Coverage" />
</a>

Backframe is a javascript library for declaratively creating REST APIs and
asynchronous service workers. Backframe provides simple, declarative tools for
creating units of work that can be handled both synchronously or asynchronously.

[Read the overview](https://github.com/mahaplatform/backframe/blob/master/docs/overview.md)

## Installation
Install with [npm](http://npmjs.com) or [yarn](https://yarnpkg.com):

```sh
npm install --save backframe
```

## REST APIS
Backframe is a great tool for rapidly creating performant REST APIs for your web
or mobile application

```javascript
import express from 'express'
import Backframe from 'backframe'
import Kittens from from 'app/models/kittens'

// initialize backframe
const backframe = Backframe()

// create a resource
const kittens = backframe.resources({
  model: Kittens
})

const app = express()

// mount backframe within express
app.use(backframe.router({
  routes: kittens
}))

app.listen(3000)
```

[Learn more about apis](https://github.com/mahaplatform/backframe/blob/master/docs/apis.md)

## Service Workers
Backframe can also be used to create service workers that can asynchronously
process jobs in a work queue


```javascript
import Backframe from 'backframe'
import Kittens from from 'app/models/kittens'

// initialize backframe
const backframe = Backframe()

// create a work queue
const scratchQueue = backframe.queue({
  name: 'scratch',
  processor: options => (job, trx) => {
    return Kitten.where({ id: job.data.id })
      .fetch({ transacting: trx })
      .then(kitten => `Scratching ${kitten.get('name')}`)
  }
})

// mount queue within service worker
const worker = backframe.worker({
  queues: [
    scratchQueue
  ]
})

// somewhere else in your app, add a job
worker.scratch.add({ id: 23 }, { priority: 'high' })
```

[Learn more about service workers](https://github.com/mahaplatform/backframe/blob/master/docs/workers.md)


## Plugins
Backframe has a plugin framework that enables developers to extend Backframe
with supplemental functionality through the addition of one or more hooks.
Plugins can also define their own configuration options to be invoked when
constructing Backframe objects.

[Learn more about plugins](https://github.com/mahaplatform/backframe/blob/master/docs/plugin.md)

## Author & Credits

Backframe was originally written by [Greg Kops](https://github.com/mochini) and
is based upon his work with [Think Topography](http://thinktopography.com),
[Funkhaus](http://funkhaus.us) and [The Cornell Cooperative Extension of Tompkins County](http://ccetompkins.org)
