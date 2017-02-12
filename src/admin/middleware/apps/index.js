import fs from 'fs'
import path from 'path'
import { Router } from 'express'

const router = Router()
const appPath = path.join(__dirname, '..', '..', '..', 'apps')

fs.readdirSync(appPath).filter(app => {

  const adminPath = path.join(appPath, app, 'admin')

  if(fs.existsSync(adminPath)) {

    const middlewarePath = path.join(adminPath, 'server')
    const routes = require(middlewarePath).default

    router.use(`/${app}`, routes)

  }

})

export default router
