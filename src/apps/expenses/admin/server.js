import { Router } from 'express'
import expenseApprovals from './middleware/approvals/expenses'
import advances from './middleware/advances'
import advanceApprovals from './middleware/approvals/advances'
import expenses from './middleware/expenses'
import expenseTypes from './middleware/expense_types'
import memberships from './middleware/memberships'
import projects from './middleware/projects'
import trips from './middleware/trips'
import tripApprovals from './middleware/approvals/trips'
import vendors from './middleware/vendors'
import reports from './middleware/reports'

export const resources = [
  advanceApprovals,
  advances,
  expenseApprovals,
  expenseTypes,
  expenses,
  memberships,
  projects,
  tripApprovals,
  trips,
  vendors,
  reports
]

const router = Router()

resources.map(resource => {

  router.use(resource.router)

})

export default router
