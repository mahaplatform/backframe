import redis from 'redis'

export default redis.createClient(process.env.REDIS_URL)
