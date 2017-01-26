import React from 'react'
import { connect } from 'react-redux'
import { getActiveUser } from '../admin/selectors'
import Avatar from '../../components/avatar'
import Search from '../../views/search'
import Account from '../../views/account'
import Notifications from '../../views/notifications'
import Navigation from '../../views/navigation'

export class Topbar extends React.Component {

  static contextTypes = {
    drawer: React.PropTypes.object,
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  static propTypes = {
    user: React.PropTypes.object.isRequired
  }

  render() {
    const { children, user } = this.props
    return (
      <div>
        <div className="chrome-topbar">
          <div className="chrome-topbar-icon" onClick={this._handleOpenNavigation.bind(this)}>
            <i className="sidebar icon" />
          </div>
          <div className="chrome-filler"></div>
          <div className="chrome-topbar-icon" onClick={this._handleOpenSearch.bind(this)}>
            <i className="search icon" />
          </div>
          <div className="chrome-topbar-icon" onClick={this._handleOpenNotifications.bind(this)}>
            <i className="alarm icon" />
            { user.unread > 0 &&
              <div className="chrome-alerts-label">{ user.unread }</div>
            }
          </div>
          <div className="chrome-topbar-icon" onClick={this._handleOpenAccount.bind(this)}>
            <Avatar user={ user } />
          </div>
        </div>
        { children }
      </div>
    )
  }

  _handleOpenNavigation() {
    this.context.drawer.open(Navigation, 'left')
  }

  _handleOpenSearch() {
    this.context.modal.push(Search)
  }

  _handleOpenNotifications() {
    this.context.modal.push(Notifications)
  }

  _handleOpenAccount() {
    this.context.drawer.open(Account, 'right')
  }

}

const mapStateToProps = state => ({
  user: getActiveUser(state)
})

export default connect(mapStateToProps)(Topbar)
