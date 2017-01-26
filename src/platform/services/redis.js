import redis from 'redis'
import bluebird from 'bluebird'

export default redis.createClient(process.env.REDIS_URL)

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)
