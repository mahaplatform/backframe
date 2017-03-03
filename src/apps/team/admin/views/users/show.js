import React from 'react'
import Avatar from 'admin/components/avatar'
import Details from 'admin/components/details'
import Tabs from 'admin/components/tabs'
import Page from 'admin/components/page'
import Access from '../access'
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
    const { user } = this.props
    return {
      top: <Avatar user={ user } />,
      items: [
        { label: 'Name ', content: user.full_name },
        { label: 'Email ', content: user.email, format: 'email' },
        { label: 'Created ', content: user.created_at, format: 'datetime' }
      ]
    }
  }

  _getTabs() {
    return {
      tabs: [
        { label: 'Roles', content: Roles },
        { label: 'Access', content: Access }
      ]
    }
  }

}

const Roles = (props) => {
  const { user } = props
  return (
    <div className="list role-users">
      { user.roles.length === 0 &&
        <div className="item">
          <p>This user has not been assigned any roles</p>
        </div>
      }
      { user.roles.map((role, index) => {
        return (
          <div key={`role_${index}`} className="item role-user">
            <strong>{ role.title }</strong><br />
            { role.description }
          </div>
        )
      }) }
    </div>
  )
}

const mapPropsToPage = (props, context) => {

  const _handleResetPassword = () => {
    context.flash.set('success', 'A reset email has been sent to the user')
  }

  const _handleSignOutAllDevices = () => {
    context.flash.set('success', 'The user has been signed out of all devices')
  }

  return {
    title: 'User',
    rights: ['team.manage_people'],
    tasks: [
      { label: 'Edit User', modal: Edit },
      { label: 'Reset Password', handler: _handleResetPassword },
      { label: 'Sign Out of All Devices', handler: _handleSignOutAllDevices }
    ],
    resources: {
      user: `/admin/team/users/${props.params.id}`,
      access: `/admin/team/users/${props.params.id}/access`
    }
  }
}

export default Page(mapPropsToPage)(Show)
