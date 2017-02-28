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
      endpoint: '/admin/expenses/trips',
      columns: [
        { label: 'Date', key: 'date', primary: true , format: 'date' },
        { label: 'Status', key: 'is_approved', primary: true, format: ApprovalStatus }
      ],
      filters: [
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title' }
      ],
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

const ApprovalStatus = (props) => {
  if(props.is_approved === true) return <span className="approved">APPROVED</span>
  if(props.is_approved === false) return <span className="rejected">REJECTED</span>
  if(props.is_approved === null) return <span className="unreviewed">UNREVIEWED</span>
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
