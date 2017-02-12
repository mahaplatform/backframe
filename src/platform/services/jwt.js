const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config({ path: '.env'})

const secret = process.env.SECRET || ''

const encode = (data, duration) => {

  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + duration
  return jwt.sign({ iat, exp, data }, secret)

}

const decode = (token) => {
  return jwt.verify(token, secret)
}

module.exports = {
  encode,
  decode
}
