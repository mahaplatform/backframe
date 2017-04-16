import express from 'express'
import { router } from 'app/services/backframe'
import routes from './app/routes'

const app = express()

app.use(router({ routes }))

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
