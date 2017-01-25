import resources from 'server/middleware/resources'
import User from 'platform/models/user'
import UserQuery from 'platform/queries/user_query'
import UserSerializer from 'platform/serializers/user_serializer'

export default router => {

  router.use(resources({
    name: 'user',
    path: 'users',
    model: User,
    query: UserQuery,
    serializer: UserSerializer,
    withRelated: ['photo','roles']
  }))

}
