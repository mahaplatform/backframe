import React from 'react'
import { IndexRoute, Route } from 'react-router'
import AdvancesIndex from './views/advances'
import ExpenseTypesIndex from './views/expense_types/index'
import ExpensesIndex from './views/expenses'
import ProjectsIndex from './views/projects/index'
import ProjectsShow from './views/projects/show'
import ReportsIndex from './views/reports'
import TripsIndex from './views/trips'
import VendorsIndex from './views/vendors/index'

const routes = (
  <Route>
    <Route path="advances" component={AdvancesIndex} />
    <Route path="expense_types" component={ExpenseTypesIndex} />
    <Route path="expenses" component={ExpensesIndex} />
    <Route path="projects">
      <IndexRoute component={ProjectsIndex} />
      <Route path=":id" component={ProjectsShow} />
    </Route>
    <Route path="reports" component={ReportsIndex} />
    <Route path="trips" component={TripsIndex} />
    <Route path="vendors" component={VendorsIndex} />
  </Route>
)

export default routes
