import resources from 'platform/middleware/resources'
import User from 'platform/models/user'
import UserQuery from 'platform/queries/user_query'
import UserSerializer from 'platform/serializers/user_serializer'
import { createRoles, updateRoles } from './hooks'

export default resources({
  name: 'user',
  model: User,
  query: UserQuery,
  serializer: UserSerializer,
  withRelated: ['photo','roles'],
  allowedParams: ['first_name','last_name','email'],
  after: {
    create: createRoles,
    update: updateRoles
  }
})
