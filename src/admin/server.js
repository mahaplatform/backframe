import { Router } from 'express'
import externalAuthentication from './middleware/external'
import client from './client'
import render from 'platform/middleware/render'
import activation from 'admin/middleware/activation'
import reset from 'admin/middleware/reset'
import signin from 'admin/middleware/signin'
import authentication from 'admin/middleware/authentication'
import session from 'admin/middleware/session'
import search from 'admin/middleware/search'
import apps from 'admin/middleware/apps'

const router = Router()

router.use('/admin', externalAuthentication)

router.get('/admin*', render(client))

router.use('/api/admin/activation', activation)

router.use('/api/admin/reset', reset)

router.use('/api/admin/signin', signin)

router.use('/api/admin', authentication)

router.use('/api/admin/session', session)

router.get('/api/admin/search', search)

router.use('/api/admin', apps)

export default router
