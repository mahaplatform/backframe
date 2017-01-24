import resources from 'platform/middleware/resources'
import User from 'platform/models/user'
import UserSerializer from 'platform/serializers/user_serializer'
import authentication from 'admin/middleware/authentication'

export default resources({
  name: 'user',
  model: User,
  serializer: UserSerializer,
  allowedParams: ['name', 'email'],
  authenticatWith: authentication
})
