import React from 'react'
import { IndexRoute, Route } from 'react-router'
import AdvancesIndex from './views/advances/index'
import AdvancesShow from './views/advances/show'
import AdvanceApprovalsIndex from './views/advance_approvals/index'
import AdvanceApprovalsShow from './views/advance_approvals/show'
import AdvanceReportIndex from './views/reports/advances'
import ExpenseTypesIndex from './views/expense_types/index'
import ExpensesIndex from './views/expenses/index'
import ExpensesShow from './views/expenses/show'
import ExpenseApprovalsIndex from './views/expense_approvals/index'
import ExpenseApprovalsShow from './views/expense_approvals/show'
import ExpenseReportIndex from './views/reports/expenses'
import ProjectsIndex from './views/projects/index'
import ProjectsShow from './views/projects/show'
import TripsIndex from './views/trips/index'
import TripsShow from './views/trips/show'
import TripApprovalsIndex from './views/trip_approvals/index'
import TripApprovalsShow from './views/trip_approvals/show'
import TripReportIndex from './views/reports/trips'
import VendorsIndex from './views/vendors/index'

const routes = (
  <Route>
    <Route path="approvals">
      <Route path="advances">
        <IndexRoute component={AdvanceApprovalsIndex} />
        <Route path=":id" component={AdvanceApprovalsShow} />
      </Route>
      <Route path="expenses">
        <IndexRoute component={ExpenseApprovalsIndex} />
        <Route path=":id" component={ExpenseApprovalsShow} />
      </Route>
      <Route path="trips">
        <IndexRoute component={TripApprovalsIndex} />
        <Route path=":id" component={TripApprovalsShow} />
      </Route>
    </Route>
    <Route path="advances">
      <IndexRoute component={AdvancesIndex} />
      <Route path=":id" component={AdvancesShow} />
    </Route>
    <Route path="expense_types" component={ExpenseTypesIndex} />
    <Route path="expenses">
      <IndexRoute component={ExpensesIndex} />
      <Route path=":id" component={ExpensesShow} />
    </Route>
    <Route path="projects">
      <IndexRoute component={ProjectsIndex} />
      <Route path=":id" component={ProjectsShow} />
    </Route>
    <Route path="reports">
      <Route path="advances" component={AdvanceReportIndex} />
      <Route path="expenses" component={ExpenseReportIndex} />
      <Route path="trips" component={TripReportIndex} />
    </Route>
    <Route path="trips">
      <IndexRoute component={TripsIndex} />
      <Route path=":id" component={TripsShow} />
    </Route>
    <Route path="vendors" component={VendorsIndex} />
  </Route>
)

export default routes
