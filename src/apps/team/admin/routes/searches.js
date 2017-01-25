import resources from 'server/middleware/resources'
import Search from 'platform/models/search'
import SearchSerializer from 'platform/serializers/search_serializer'

export default router => {

  router.use(resources({
    name: 'search',
    path: 'searches',
    model: Search,
    serializer: SearchSerializer,
    only: ['find','create','remove']
  }))

}
