import { Router } from 'express'
import approvals from './middleware/approvals'
import advances from './middleware/advances'
import expenses from './middleware/expenses'
import expenseTypes from './middleware/expense_types'
import projects from './middleware/projects'
import trips from './middleware/trips'
import vendors from './middleware/vendors'
import reports from './middleware/reports'

export const resources = [
  approvals,
  advances,
  expenses,
  expenseTypes,
  projects,
  trips,
  vendors,
  reports
]

const router = Router()

resources.map(resource => {

  router.use(resource.router)

})

export default router
