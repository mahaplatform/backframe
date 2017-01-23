import resources from 'app/middleware/resources'
import User from 'app/models/user'
import UserSerializer from 'app/serializers/user_serializer'

export default resources({
  name: 'user',
  model: User,
  serializer: UserSerializer,
  allowedParams: ['name', 'email']
})
