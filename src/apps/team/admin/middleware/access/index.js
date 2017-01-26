import { Router } from 'express'
import roleAccess from './role_access'
import access from './access'

const router = Router()
router.get('/roles/:id/access', roleAccess)
router.get('/access', access)

export default router
