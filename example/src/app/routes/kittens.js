import backframe from '../../services/backframe'
import Kitten from '../models/kitten'
import KittenSerializer from '../serializers/kitten_serializer'
import _ from 'lodash'

export default backframe.resources({
  allowedParams: ['name','age'],
  model: Kitten,
  name: 'kitten',
  filterParams: ['name','created_at'],
  serializer: KittenSerializer,
  sortParams: ['name','age']
})
