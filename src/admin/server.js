import { Router } from 'express'
import signin from 'admin/middleware/signin'
import users from 'admin/middleware/users'

const router = Router()

router.use('/api/admin/signin', signin)

router.use('/api/admin/users', users)

export default router
