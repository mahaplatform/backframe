import React from 'react'
import { Link } from 'react-router'
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
      endpoint: '/admin/expenses/projects',
      columns: [
        { label: 'Title', key: 'title', primary: true },
        { label: 'Code', key: 'code', primary: true },
        { label: 'Active', key: 'is_active', primary: true, format: 'check_times' }
      ],
      link: '/admin/expenses/projects/#{id}',
      sort: { key: 'title', order: 'asc' },
      entity: 'project',
      empty: {
        icon: 'folder',
        modal: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/projects/#{id}/edit'}
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Projects',
  rights: ['expenses.manage_configuration'],
  task: {
    label: 'New Project',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
