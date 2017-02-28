import React from 'react'
import { Route } from 'react-router'
import AdvancesIndex from './views/advances/index'
import AdvancesShow from './views/advances/show'
import AdvanceApprovalsIndex from './views/advance_approvals/index'
import AdvanceApprovalsShow from './views/advance_approvals/show'
import AdvanceReportIndex from './views/reports/advances'
import AdvanceReportShow from './views/reports/advance'
import ExpenseTypesIndex from './views/expense_types/index'
import ExpensesIndex from './views/expenses/index'
import ExpensesShow from './views/expenses/show'
import ExpenseApprovalsIndex from './views/expense_approvals/index'
import ExpenseApprovalsShow from './views/expense_approvals/show'
import ExpenseReportIndex from './views/reports/expenses'
import ExpenseReportShow from './views/reports/expense'
import ProjectsIndex from './views/projects/index'
import ProjectsShow from './views/projects/show'
import TripsIndex from './views/trips/index'
import TripsShow from './views/trips/show'
import TripApprovalsIndex from './views/trip_approvals/index'
import TripApprovalsShow from './views/trip_approvals/show'
import TripReportIndex from './views/reports/trips'
import TripReportShow from './views/reports/trip'
import VendorsIndex from './views/vendors/index'

const routes = (
  <Route>
    <Route path="approvals">
      <Route path="advances" component={ AdvanceApprovalsIndex } />
      <Route path="advances/:id" component={ AdvanceApprovalsShow } />
      <Route path="expenses" component={ ExpenseApprovalsIndex } />
      <Route path="expenses/:id" component={ ExpenseApprovalsShow } />
      <Route path="trips" component={ TripApprovalsIndex } />
      <Route path="trips/:id" component={ TripApprovalsShow } />
    </Route>
    <Route path="reports">
      <Route path="advances" component={ AdvanceReportIndex } />
      <Route path="advances/:id" component={ AdvanceReportShow } />
      <Route path="expenses" component={ ExpenseReportIndex } />
      <Route path="expenses/:id" component={ ExpenseReportShow } />
      <Route path="trips" component={ TripReportIndex } />
      <Route path="trips/:id" component={ TripReportShow } />
    </Route>
    <Route path="advances" component={ AdvancesIndex } />
    <Route path="advances/:id" component={ AdvancesShow } />
    <Route path="expense_types" component={ ExpenseTypesIndex } />
    <Route path="expenses" component={ ExpensesIndex } />
    <Route path="expenses/:id" component={ ExpensesShow } />
    <Route path="projects" component={ ProjectsIndex } />
    <Route path="projects/:id" component={ ProjectsShow } />
    <Route path="trips" component={ TripsIndex } />
    <Route path="trips/:id" component={ TripsShow } />
    <Route path="vendors" component={ VendorsIndex } />
  </Route>
)

export default routes
