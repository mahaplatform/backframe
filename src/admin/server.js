import { Router } from 'express'
import activation from 'admin/middleware/activation'
import reset from 'admin/middleware/reset'
import signin from 'admin/middleware/signin'
import authentication from 'admin/middleware/authentication'
import apps from 'admin/middleware/apps'

const router = Router()

router.use('/activation', activation)

router.use('/reset', reset)

router.use('/signin', signin)

router.use(authentication)

router.use(apps)

export default router
