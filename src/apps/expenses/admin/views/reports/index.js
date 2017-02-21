import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'

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
      endpoint: '/admin/expenses/reports/expenses',
      columns: [
        { label: 'Date', key: 'date', primary: true , format: 'date' },
        { label: 'User', key: 'user.full_name', primary: true },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Vendor', key: 'vendor.name', primary: false },
        { label: 'Expense Type', key: 'expense_type.title', primary: false },
        { label: 'Amount', key: 'amount', primary: true, format: 'currency' },
        { label: 'Status', key: 'is_approved', primary: true, format: ApprovalStatus }
      ],
      filters: [
        { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/admin/team/users', value: 'id', text: 'full_name' },
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title' },
        { label: 'Expense Type', name: 'expense_type_id', type: 'select', endpoint: '/admin/expenses/expense_types', value: 'id', text: 'title' },
        { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] }
      ],
      link: '/admin/expenses/approvals/#{id}',
      sort: { key: 'date', order: 'desc' },
      entity: 'expense'
    }
  }

}

const ApprovalStatus = (props) => {
  if(props.is_approved === true) return <span className="approved">APPROVED</span>
  if(props.is_approved === false) return <span className="rejected">REJECTED</span>
  if(props.is_approved === null) return <span className="unreviewed">UNREVIEWED</span>
}

const mapPropsToPage = (props, context) => ({
  title: 'Expenses Report'
})

export default Page(mapPropsToPage)(Index)
