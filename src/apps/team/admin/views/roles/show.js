import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Tabs from 'admin/components/tabs'
import Access from '../access'
import Avatar from 'admin/components/avatar'
import Edit from './edit'

class Show extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content">
          <Tabs {...this.props} {...this._getTabs()} />
        </div>
      </div>
    )
  }

  _getDetails() {
    const { role } = this.props
    return {
      items: [
        { label: 'Title ', content: role.title },
        { label: 'Description ', content: role.description }
      ]
    }
  }

  _getTabs() {
    return {
      tabs: [
        { label: 'Users', content: Users },
        { label: 'Access', content: Access }
      ]
    }
  }

}

const Users = (props) => {
  const { role } = props
  return (
    <div className="list role-users">
      { role.users.length === 0 &&
        <div className="item">
          <p>This role has not been assigned to any users</p>
        </div>
      }
      { role.users.map((user, index) => {
        return (
          <div key={`user_${index}`} className="item role-user">
            <Avatar user={ user } />
            <strong>{ user.full_name }</strong><br />
            { user.email }
          </div>
        )
      }) }
    </div>
  )
}

const mapPropsToPage = (props, context) => {

  return {
    title: 'Role',
    rights: ['team.manage_people'],
    tasks: [
      { label: 'Edit Role', modal: Edit }
    ],
    resources: {
      role: `/admin/team/roles/${props.params.id}`,
      access: `/admin/team/roles/${props.params.id}/access`
    }
  }
}

export default Page(mapPropsToPage)(Show)
