# Plugins
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
