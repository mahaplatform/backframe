import express from 'express'
import bodyParser from 'body-parser'
import authenticate from 'app/middleware/authenticate'
import logger from 'app/middleware/logger'
import exceptionHandler from 'app/middleware/exception_handler'
import tickets from 'app/routes/tickets'
import users from 'app/routes/users'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(authenticate)

app.use(logger)

app.use(tickets)
app.use(users)

app.use(exceptionHandler)

app.listen(3000, () => {
  console.log('Listening on 3000')
})
