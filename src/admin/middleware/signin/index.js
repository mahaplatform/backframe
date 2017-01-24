import { Router } from 'express'
import teams from './teams'
import email from './email'
import password from './password'
import forgot from './forgot'

const router = Router()
router.get('/teams', teams)
router.get('/email', email)
router.post('/password', password)
router.post('/forgot', forgot)
export default router
