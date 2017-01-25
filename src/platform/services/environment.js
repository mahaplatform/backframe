import fs from 'fs'
import dotenv from 'dotenv'

if(fs.existsSync('.env')) {
  dotenv.load()
}

export default null
