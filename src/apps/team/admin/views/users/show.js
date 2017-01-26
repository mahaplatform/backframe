import React from 'react'
import Avatar from 'admin/components/avatar'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Edit from './edit'

class Show extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content"></div>
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
        { label: 'Roles ', content: user.roles.map(role => role.title).join(', ') },
        { label: 'Created ', content: user.created_at, format: 'datetime' }
      ]
    }
  }

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
    rights: [],
    tasks: [
      { label: 'Edit User', modal: Edit },
      { label: 'Reset Password', handler: _handleResetPassword },
      { label: 'Sign Out of All Devices', handler: _handleSignOutAllDevices }
    ],
    resources: {
      user: `/admin/team/users/${props.params.id}`
    }
  }
}

export default Page(mapPropsToPage)(Show)
