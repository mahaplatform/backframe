import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import New from './new'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Collection {...this._getCollection()} />
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/expenses/advances',
      columns: [
        { label: 'Date', key: 'date', primary: true , format: 'date' },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Amount', key: 'amount', primary: true, formt: 'currency' }
      ],
      filters: [
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title' },
        { label: 'Expense Type', name: 'expense_type_id', type: 'select', endpoint: '/admin/expenses/expense_types', value: 'id', text: 'title' },
        { label: 'Date Range', name: 'daterange', type: 'daterange', include: ['this','last'] }
      ],
      link: '/admin/expenses/advances/#{id}',
      sort: { key: 'created_at', order: 'desc' },
      entity: 'advance',
      empty: {
        icon: 'arrow circle right',
        modal: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/advances/#{id}/edit'}
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Advances',
  task: {
    label: 'New Advance',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
