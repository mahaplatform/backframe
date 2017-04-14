import Promise from 'bluebird'

export default {

  getAsync: (key) => {
    return Promise.resolve(key)
  },

  setAsync: (key, value) => {
    return Promise.resolve(value)
  },

  expireAsync: (key, duration) => {}

}
