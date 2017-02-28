import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import New from './new'
import ApprovalStatus from '../../components/approval_status'

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
      endpoint: '/admin/expenses/trips',
      columns: [
        { label: 'Date', key: 'date', primary: true , format: 'date' },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Miles', key: 'total_miles', primary: false },
        { label: 'Amount', key: 'amount', primary: false, format: 'currency' },
        { label: 'Status', key: 'is_approved', primary: true, format: ApprovalStatus }
      ],
      filters: [
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title' },
        { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
        { label: 'Status', name: 'is_approved', type: 'select', options: [ { value: 'null', text: 'Unreviewed' }, { value: '1', text: 'Approved' }, { value: '0', text: 'Rejected' } ] }
      ],
      link: '/admin/expenses/trips/#{id}',
      sort: { key: 'created_at', order: 'desc' },
      entity: 'trip',
      empty: {
        icon: 'car',
        modal: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/trips/#{id}/edit'}
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Trips',
  rights: ['expenses.manage_expenses'],
  task: {
    label: 'New Trip',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
