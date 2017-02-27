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
      endpoint: '/admin/team/roles',
      columns: [
        { label: 'Title', key: 'title', primary: true, format: TitleCell }
      ],
      entity: 'role',
      link: '/admin/team/roles/#{id}',
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/team/users/#{id}/edit'}
      ],
      sort: { key: 'title', order: 'asc' }
    }
  }

}

var TitleCell = (props) => {
  return (
    <div>
      <strong>{ props.title }</strong><br />
      { props.description }
    </div>
  )
}

const mapPropsToPage = (props, context) => ({
  title: 'Roles',
  task: {
    label: 'New Role',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
