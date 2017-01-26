import { Router } from 'express'
import access from './middleware/access'
import activities from './middleware/activities'
import appAuthors from './middleware/app_authors'
import appCategories from './middleware/app_categories'
import apps from './middleware/apps'
import assets from './middleware/assets'
import roles from './middleware/roles'
import searches from './middleware/searches'
import users from './middleware/users'

const router = Router()
router.use('/access', access)
router.use('/activities', activities)
router.use('/apps/authors', appAuthors)
router.use('/apps/categories', appCategories)
router.use('/apps', apps)
router.use('/assets', assets)
router.use('/roles', roles)
router.use('/searches', searches)
router.use('/users', users)

export default router
