import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Tabs from 'admin/components/tabs'
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
    <div className="role-users">
      { role.users.map(user => {
        return (
          <div className="role-user">
            <Avatar user={ user } />
            <strong>{ user.full_name }</strong><br />
            { user.email }
          </div>
        )
      }) }
    </div>
  )
}

const Access = (props) => {
  const { access } = props
  return (
    <div className="role-access">
      { access.map((app, appindex) => {
        return (
          <div className="role-access-app">
            <div className="role-access-title">
              { app.title }
            </div>
            { app.rights.length > 0 && app.rights.map((right, rightindex) => {
              return (
                <div className="role-access-right">
                  <div className="role-access-right-icon">
                    { right.assigned ? <i className="green check icon" /> : <i className="red remove icon" /> }
                  </div>
                  <div className="role-access-right-label">
                    <strong>{ right.text }</strong><br />
                    { right.description }
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const mapPropsToPage = (props, context) => {

  return {
    title: 'Role',
    rights: [],
    tasks: [
      { label: 'Edit Role', modal: Edit }
    ],
    resources: {
      role: `/admin/roles/${props.params.id}`,
      access: `/admin/roles/${props.params.id}/access`
    }
  }
}

export default Page(mapPropsToPage)(Show)
