const fs = require('fs')
const dotenv = require('dotenv')

if(fs.existsSync('.env')) {
    dotenv.load()
}
