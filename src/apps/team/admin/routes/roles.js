import resources from 'server/middleware/resources'
import Role from 'platform/models/role'
import RoleQuery from 'platform/queries/role_query'
import RoleSerializer from 'platform/serializers/role_serializer'

export default router => {

  router.use(resources({
    name: 'role',
    path: 'roles',
    model: Role,
    query: RoleQuery,
    serializer: RoleSerializer,
    include: ['users.photo']
  }))

}
