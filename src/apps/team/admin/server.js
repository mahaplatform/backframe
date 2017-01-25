import { Router } from 'express'
import appCategories from 'apps/team/routes/app_categories'
import appAuthors from 'apps/team/routes/app_authors'
import apps from 'apps/team/routes/apps'
import activities from 'apps/team/routes/activities'
import assets from 'apps/team/routes/assets'
import roles from 'apps/team/routes/roles'
import searches from 'apps/team/routes/searches'
import users from 'apps/team/routes/users'
import access from 'apps/team/routes/access'

const router = Router()

appCategories(router)
appAuthors(router)
apps(router)
activities(router)
assets(router)
roles(router)
searches(router)
users(router)
access(router)


export default router
