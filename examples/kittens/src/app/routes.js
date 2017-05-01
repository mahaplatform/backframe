import { resources } from 'app/services/backframe'
import Kitten from 'app/models/kitten'
import KittenSerializer from 'app/serializers/kitten_serializer'
import _ from 'lodash'

export default resources({
  allowedParams: ['name','age'],
  model: Kitten,
  name: 'kitten',
  filterParams: ['name','created_at'],
  serializer: KittenSerializer,
  sortParams: ['name','age']
})
