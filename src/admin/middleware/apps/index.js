import fs from 'fs'
import path from 'path'
import { Router } from 'express'

const router = Router()

const appPath = path.join(__dirname, '..', '..', '..', 'apps')
fs.readdirSync(appPath).filter(app => {
  const adminPath = path.join(appPath, app, 'admin')
  if(fs.existsSync(adminPath)) {
    const middlewaresPath = path.join(adminPath, 'middleware')
    if(fs.existsSync(middlewaresPath)) {
      const appRouter = Router()
      fs.readdirSync(middlewaresPath).filter(middleware => {
        const middlewarePath = path.join(middlewaresPath, middleware)
        require(middlewarePath).default(appRouter)
      })
      router.use(`/${app}`, appRouter)
    }
  }
})

export default router
