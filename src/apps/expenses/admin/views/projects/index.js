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
        { label: 'Title', key: 'title', primary: true, format: TitleCell },
        { label: 'Code', key: 'code', primary: true }
      ],
      sort: { key: 'created_at', order: 'desc' },
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

var TitleCell = (props) => {
  return (
    <Link to={`/admin/expenses/projects/${props.id}` }>
      {props.title}
    </Link>
  )
}

const mapPropsToPage = (props, context) => ({
  title: 'Projects',
  task: {
    label: 'New Project',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
