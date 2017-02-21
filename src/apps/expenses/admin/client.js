import React from 'react'
import { IndexRoute, Route } from 'react-router'
import AdvancesIndex from './views/advances'
import ExpenseTypesIndex from './views/expense_types/index'
import ExpensesIndex from './views/expenses/index'
import ExpensesShow from './views/expenses/show'
import ApprovalsIndex from './views/approvals/index'
import ApprovalsShow from './views/approvals/show'
import ProjectsIndex from './views/projects/index'
import ProjectsShow from './views/projects/show'
import ReportsIndex from './views/reports'
import TripsIndex from './views/trips'
import VendorsIndex from './views/vendors/index'

const routes = (
  <Route>
    <Route path="approvals">
      <IndexRoute component={ApprovalsIndex} />
      <Route path=":id" component={ApprovalsShow} />
    </Route>
    <Route path="advances" component={AdvancesIndex} />
    <Route path="expense_types" component={ExpenseTypesIndex} />
    <Route path="expenses">
      <IndexRoute component={ExpensesIndex} />
      <Route path=":id" component={ExpensesShow} />
    </Route>
    <Route path="projects">
      <IndexRoute component={ProjectsIndex} />
      <Route path=":id" component={ProjectsShow} />
    </Route>
    <Route path="reports/expenses" component={ReportsIndex} />
    <Route path="trips" component={TripsIndex} />
    <Route path="vendors" component={VendorsIndex} />
  </Route>
)

export default routes
