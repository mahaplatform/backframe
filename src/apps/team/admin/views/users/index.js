import React from 'react'
import { Link } from 'react-router'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import Avatar from 'admin/components/avatar'
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
      endpoint: '/admin/users',
      columns: [
        { label: 'Name', key: 'first_name', primary: true, format: NameCell },
        { label: 'Email', key: 'email' }
      ],
      filters: [
        { label: 'Role', name: 'role_id', type: 'select', multiple: true, endpoint: '/admin/roles', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } }
      ],
      entity: 'user',
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/team/users/#{id}/edit'}
      ],
      sort: { key: 'last_name', order: 'asc' }
    }
  }

}

var NameCell = (props) => {
  return (
    <Link to={`/admin/team/users/${props.id}` }>
      <Avatar user={ props } />
      <strong>{ props.first_name } { props.last_name }</strong><br />
      { props.email }
    </Link>
  )
}

const mapPropsToPage = (props, context) => ({
  title: 'Users',
  task: {
    label: 'New User',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
