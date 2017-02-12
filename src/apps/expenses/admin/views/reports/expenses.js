import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'

class Expenses extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Collection {...this._getCollection()} />
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/expenses/report/expenses',
      columns: [
        { label: 'User', key: 'user.full_name', primary: true },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Amount', key: 'amount', primary: true, format: 'currency' }
      ],
      filters: [
        { label: 'Users', name: 'user_id', type: 'select', multiple: true, endpoint: '/admin/users', value: 'id', text: 'full_name' },
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title' },
        { label: 'Expense Type', name: 'expense_type_id', type: 'select', endpoint: '/admin/expenses/expense_types', value: 'id', text: 'title' },
        { label: 'Date Range', name: 'daterange', type: 'daterange', include: ['this','last'] }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'expense'
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Expenses'
})

export default Page(mapPropsToPage)(Expenses)
