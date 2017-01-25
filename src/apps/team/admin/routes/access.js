import FindRoleAccess from './middleware/find_role_access'
import FindAccess from './middleware/find_access'

export default router => {

  router.get('/roles/:id/access', FindRoleAccess)
  router.get('/access', FindAccess)

}
