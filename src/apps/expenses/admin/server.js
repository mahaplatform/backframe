import { Router } from 'express'
import advances from './middleware/advances'
import advanceApprovals from './middleware/approvals/advances'
import advanceReport from './middleware/reports/advances'
import expenses from './middleware/expenses'
import expenseTypes from './middleware/expense_types'
import expenseApprovals from './middleware/approvals/expenses'
import expenseReport from './middleware/reports/expenses'
import memberships from './middleware/memberships'
import projects from './middleware/projects'
import trips from './middleware/trips'
import tripApprovals from './middleware/approvals/trips'
import tripReport from './middleware/reports/trips'
import vendors from './middleware/vendors'

export const resources = [
  advanceApprovals,
  advanceReport,
  advances,
  expenseApprovals,
  expenseReport,
  expenseTypes,
  expenses,
  memberships,
  projects,
  tripApprovals,
  tripReport,
  trips,
  vendors
]

const router = Router()

resources.map(resource => {

  router.use(resource.router)

})

export default router
