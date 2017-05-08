import redis from '../services/redis'
import moment from 'moment'

export const parseJSON = string => {

  try {
    return JSON.parse(string)
  } catch(e) {
    return string
  }

}

export default options => async (key, duration, method) => {

  const result = await redis.getAsync(key)

  if(result) return parseJSON(result)

  const json = await method()

  const res = await redis.setAsync(key, JSON.stringify(json))

  await redis.expireAsync(key, duration)

  return json

}
