export const parseJSON = string => {

  try {
    return JSON.parse(string)
  } catch(e) {
    return string
  }

}

export const cache = (options) => {

  const redis = options.redis

  return async (key, duration, method) => {

    const result = await redis.getAsync(key)

    const json = result ? {
      cached: true,
      data: parseJSON(result)
    } : await method()

    if(json.cached) return json.data

    await redis.setAsync(key, JSON.stringify(json))

    await redis.expireAsync(key, duration)

    return json

  }

}

export default cache
