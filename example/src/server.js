import environment from './services/environment'
import express from 'express'
import backframe from './services/backframe'
import routes from './app/routes'

const app = express()

app.use(backframe.router({ routes }))

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
