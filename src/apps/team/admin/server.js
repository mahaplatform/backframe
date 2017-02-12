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

export const resources = [
  // access,
  activities,
  appAuthors,
  appCategories,
  apps,
  assets,
  roles,
  searches,
  users
]

const router = Router()

router.use('/access', access)

router.use('/test', (req, res) => {
  res.send('test')
})

resources.map(resource => {

  router.use(resource.router)

})

export default router
