import resources from 'platform/middleware/resources'
import Search from 'platform/models/search'
import SearchSerializer from 'platform/serializers/search_serializer'

export default resources({
  name: 'search',
  model: Search,
  path: 'searches',
  serializer: SearchSerializer,
  only: ['find','create','remove']
})
