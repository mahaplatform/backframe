import express from 'express'
import { router, resources } from 'app/services/backframe'
import Kitten from 'app/models/kitten'
import KittenSerializer from 'app/serializers/kitten_serializer'

const kittens = resources({
  allowedParams: ['name','age'],
  model: Kitten,
  name: 'kitten',
  filterParams: ['name','created_at'],
  serializer: KittenSerializer,
  sortParams: ['name','age']
})

const app = express()

app.use(router({
  routes: kittens
}))

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
