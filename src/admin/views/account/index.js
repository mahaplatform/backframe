import React from 'react'
import { connect } from 'react-redux'
import { getActiveTeam, getActiveUser } from 'admin/components/admin/selectors'
import Avatar from 'admin/components/avatar'
import Edit from './edit'
import Password from './password'

export class Account extends React.Component {

  static contextTypes = {
    drawer: React.PropTypes.object,
    modal: React.PropTypes.object,
    router: React.PropTypes.object,
    admin: React.PropTypes.object,
    session: React.PropTypes.object
  }

  static propTypes = {
    team: React.PropTypes.object,
    user: React.PropTypes.object
  }

  render() {
    const { user } = this.props
    return (
      <div className="chrome-account-panel">
        <div className="chrome-account-identity">
          <Avatar user={ user } />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="chrome-account-tasks">
          <div className="chrome-account-task" onClick={this._handleModal.bind(this, Edit)}>
            <i className="write icon" /> Edit account
          </div>
          <div className="chrome-account-task" onClick={this._handleModal.bind(this, Password)}>
            <i className="lock icon" /> Change password
          </div>
        </div>
      </div>
    )
  }

  _handleModal(component) {
    this.context.drawer.close()
    this.context.modal.push(component)
  }

  _handleSignout(index) {
    this.context.drawer.close()
    window.setTimeout(() => {
      this.context.admin.removeTeam(index)
    }, 1000)
  }

  _handleCloseDrawer() {
    this.context.drawer.close()
  }

}

const mapStateToProps = state => ({
  active: state.admin.active,
  team: getActiveTeam(state),
  user: getActiveUser(state)
})

export default connect(mapStateToProps)(Account)
