<table width="100%" bgcolor="#EEE">
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/mahaplatform/backframe/master/docs/backframe.png" title="Backframe" alt="Backframe"/>
    </td>
  </tr>
</table>

<a href="https://circleci.com/gh/mahaplatform/backframe">
  <img src="https://img.shields.io/circleci/project/mahaplatform/backframe.svg?maxAge=600" alt="Build Status" >
</a>
<a href="https://codeclimate.com/github/mahaplatform/backframe">
  <img src="https://img.shields.io/codeclimate/github/mahaplatform/backframe.svg?maxAge=600" alt="Code Climate" />
</a>
<a href="https://codeclimate.com/github/mahaplatform/backframe/coverage">
  <img src="https://img.shields.io/codeclimate/coverage/github/mahaplatform/backframe.svg?maxAge=600" alt="Code Coverage" />
</a>

Backframe is a javascript library for declaratively creating REST APIs for
Express. Express is a great tool for building lightweight web and application
servers, but it leaves almost all of the implementation to the developer. When
building REST API's, this usually ends up requiring the developer to write
a lot of tedious and repetitive code. Backframe provides simple, declarative
tools for building REST APIs.

[Read the overview](https://github.com/mahaplatform/backframe/blob/master/docs/overview.md)

## Installation
Install with [npm](http://npmjs.com) or [yarn](https://yarnpkg.com):

```sh
npm install --save backframe
```

## Usage
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

[Learn more](https://github.com/mahaplatform/backframe/blob/master/docs/api.md)

## Author & Credits

Backframe was originally written by [Greg Kops](https://github.com/mochini) and
is based upon his work with [Think Topography](http://thinktopography.com),
[Funkhaus](http://funkhaus.us) and [The Cornell Cooperative Extension of Tompkins County](http://ccetompkins.org)
