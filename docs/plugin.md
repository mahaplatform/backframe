# Plugins
Backframe has a plugin framework that enables developers to extend or decorate
the lifecycle of a Backframe handler with supplemental functionality through
the addition of one or more hooks. Plugins can also define their own configuration
options to be invoked when constructing Backframe objects.

```Javascript
import { plugin } from 'backframe'

const alterRequest = (req, trx, options) => {
  console.log('altering request')
  resolve(req)
}

const beforeProcessor = (req, trx, options) => {
  console.log('before processor')
  resolve()
}

const afterProcessor = (req, trx, options) => {
  console.log('after processor')
  resolve()
}

const alterRecord = (req, trx, result, options) => {
  console.log('altering record')
  resolve(result)
}

const beforeCommit = (req, trx, options) => {
  console.log('before commit')
  resolve()
}

const beforeRollback = (req, trx, options) => {
  console.log('before rollback')
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
  alterRequest,
  before,
  after,
  alterRequest
})
```
