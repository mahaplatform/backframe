import roleAccess from './role_access'
import access from './access'

export default router => {

  router.get('/roles/:id/access', roleAccess)
  router.get('/access', access)

}
