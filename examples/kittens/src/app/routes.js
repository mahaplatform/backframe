import { resources } from 'app/services/backframe'
import Kitten from 'app/models/kitten'
import KittenSerializer from 'app/serializers/kitten_serializer'
import _ from 'lodash'

const beforeHooks = options => (req, resolve, reject) => {
  resolve('foo')
}

export default resources({
  allowedParams: ['name','age'],
  beforeHooks,
  model: Kitten,
  name: 'kitten',
  filterParams: ['name','created_at'],
  serializer: KittenSerializer,
  sortParams: ['name','age']
})
