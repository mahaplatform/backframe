import resources from 'platform/middleware/resources'
import User from 'platform/models/user'
import UserQuery from 'platform/queries/user_query'
import UserSerializer from 'platform/serializers/user_serializer'
import { createRoles, updateRoles } from './hooks'

export default resources({
  after: {
    create: createRoles,
    update: updateRoles
  },
  allowedParams: ['first_name','last_name','email'],
  defaultSort: 'last_name',
  model: User,
  name: 'user',
  path: 'users',
  query: UserQuery,
  serializer: UserSerializer,
  sortParams: ['last_name'],
  filterParams: ['role_id'],
  withRelated: ['photo','roles']
})
