import { Router } from 'express'
import advances from './middleware/advances'
import expenses from './middleware/expenses'
import projects from './middleware/projects'
import trips from './middleware/trips'
import vendors from './middleware/vendors'

export const resources = [
  advances,
  expenses,
  projects,
  trips,
  vendors
]

const router = Router()

resources.map(resource => {

  router.use(resource.router)

})

export default router
