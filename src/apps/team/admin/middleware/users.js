import resources from 'platform/middleware/resources'
import User from 'platform/models/user'
import UserQuery from 'platform/queries/user_query'
import UserSerializer from 'platform/serializers/user_serializer'

export default router => {

  router.use('/users', resources({
    name: 'user',
    model: User,
    query: UserQuery,
    serializer: UserSerializer,
    withRelated: ['photo','roles']
  }))

}
