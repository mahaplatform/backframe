import redis from 'platform/services/redis'

const parseJSON = string => {

  try {
    return JSON.parse(string)
  } catch(e) {
    return string
  }

}

export const wrapper = (redis) => {

  return (key, duration, method) => {

    return redis.getAsync(key).then(result => {

      if(result) {
        return  {
          cached: true,
          data: parseJSON(result)
        }
      }

      return method()

    }).then(json => {

      if(json.cached) {
        return json.data
      }

      return redis.setAsync(key, JSON.stringify(json)).then(result => {

        return redis.expireAsync(key, duration)

      }).then(result => {

        return json

      })

    })

  }

}

export default wrapper(redis)
