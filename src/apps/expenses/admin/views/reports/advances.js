import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
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
      endpoint: '/admin/expenses/reports/advances',
      columns: [
        { label: 'Date Needed', key: 'date_needed', primary: true , format: 'date' },
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
        { label: 'Vendor', name: 'vendor_id', type: 'select', endpoint: '/admin/expenses/vendors', value: 'id', text: 'title' },
        { label: 'Date Range', name: 'date_needed', type: 'daterange', include: ['this','last','next'] },
        { label: 'Status', name: 'is_approved', type: 'select', options: [ { value: 'null', text: 'Unreviewed' }, { value: '1', text: 'Approved' }, { value: '0', text: 'Rejected' } ] }
      ],
      export: true,
      link: '/admin/expenses/reports/advances/#{id}',
      sort: { key: 'date_needed', order: 'desc' },
      entity: 'advance'
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Advances Report',
  rights: ['expenses.access_reports']
})

export default Page(mapPropsToPage)(Index)
