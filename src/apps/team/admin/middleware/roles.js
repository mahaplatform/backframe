import resources from 'platform/middleware/resources'
import Role from 'platform/models/role'
import RoleQuery from 'platform/queries/role_query'
import RoleSerializer from 'platform/serializers/role_serializer'

export default resources({
  name: 'role',
  model: Role,
  query: RoleQuery,
  serializer: RoleSerializer,
  withRelated: ['users.photo']
})
