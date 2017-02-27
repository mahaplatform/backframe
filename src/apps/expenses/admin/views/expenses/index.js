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
      endpoint: '/admin/expenses/expenses',
      columns: [
        { label: 'Date', key: 'date', primary: true , format: 'date' },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Vendor', key: 'vendor.name', primary: false },
        { label: 'Expense Type', key: 'expense_type.title', primary: false },
        { label: 'Amount', key: 'amount', primary: true, format: 'currency' },
        { label: 'Status', key: 'expenses_approvals.is_approved', primary: true, format: ApprovalStatus }
      ],
      filters: [
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title' },
        { label: 'Expense Type', name: 'expense_type_id', type: 'select', endpoint: '/admin/expenses/expense_types', value: 'id', text: 'title' },
        { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
        { label: 'Status', name: 'expenses_approvals.is_approved', type: 'select', options: [ { value: 'null', text: 'Unreviewed' }, { value: '1', text: 'Approved' }, { value: '0', text: 'Rejected' } ] }
      ],
      link: '/admin/expenses/expenses/#{id}',
      sort: { key: 'date', order: 'desc' },
      entity: 'expense',
      empty: {
        icon: 'dollar',
        modal: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/expenses/#{id}/edit'}
      ]
    }
  }

}

const ApprovalStatus = (props) => {
  if(props.approval.is_approved === true) return <span className="approved">APPROVED</span>
  if(props.approval.is_approved === false) return <span className="rejected">REJECTED</span>
  if(props.approval.is_approved === null) return <span className="unreviewed">UNREVIEWED</span>
}

const mapPropsToPage = (props, context) => ({
  title: 'Expenses',
  task: {
    label: 'New Expense',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
