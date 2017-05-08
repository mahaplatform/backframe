import backframe from 'app/services/backframe'
import Kitten from 'app/models/kitten'
import KittenSerializer from 'app/serializers/kitten_serializer'
import _ from 'lodash'

export default backframe.resources({
  allowedParams: ['name','age'],
  model: Kitten,
  filterParams: ['name','created_at'],
  serializer: KittenSerializer,
  sortParams: ['name','age']
})
