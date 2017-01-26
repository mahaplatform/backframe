const localforage = require('localforage')

module.exports = localforage.createInstance({
  name: 'platform',
  storeName: 'cache'
})
