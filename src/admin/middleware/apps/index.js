import fs from 'fs'
import path from 'path'
import { Router } from 'express'
import App from './app'

const router = Router()
const appPath = path.join(__dirname, '..', '..', '..', 'apps')

fs.readdirSync(appPath).filter(app => {

  const configPath = path.join(appPath, app, 'app.json')
  const adminPath = path.join(appPath, app, 'admin')

  if(fs.existsSync(adminPath)) {

    const middlewarePath = path.join(adminPath, 'server')
    const routes = require(middlewarePath).default
    const config = require(configPath)

    router.use(`/${app}`, App(config.title))

    router.use(`/${app}`, routes)

  }

})

export default router
