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
      endpoint: '/admin/expenses/approvals',
      columns: [
        { label: 'Type', key: 'owner.type', primary: true },
        { label: 'Project', key: 'owner.project.title', primary: true },
        { label: 'User', key: 'owner.user.full_name', primary: true },
        { label: 'Status', key: 'is_approved', primary: true, format: ApprovalStatus }
      ],
      filters: [
        { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/admin/team/users', value: 'id', text: 'full_name' },
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title' },
        { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
        { label: 'Status', name: 'is_approved', type: 'select', options: [ { value: 'null', text: 'Unreviewed' }, { value: '1', text: 'Approved' }, { value: '0', text: 'Rejected' } ] }
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
  title: 'Approve Expenses'
})

export default Page(mapPropsToPage)(Index)
