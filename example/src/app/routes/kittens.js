import backframe from '../../services/backframe'
import Kitten from '../models/kitten'
import KittenSerializer from '../serializers/kitten_serializer'
import Queue from 'bull'
import _ from 'lodash'

const scratchQueue = new Queue("scratch");

const scratch = backframe.route({
  method: 'get',
  path: 'scratch',
  processor: options => (req, trx) => {
    return scratchQueue.add({ id: req.params.id }).then(() => null)
  }
})

export default backframe.resources({
  actions: {
    scratch
  },
  allowedParams: ['name','age'],
  model: Kitten,
  filterParams: ['name','created_at'],
  serializer: KittenSerializer,
  sortParams: ['name','age']
})
