import React from 'react'
import _ from 'lodash'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { getActiveTeam} from '../admin/selectors'
import * as actions from './actions'

class Permissions extends React.Component {

  render() {
    const { preferences } = this.props
    const notifications = preferences ? preferences.notifications : undefined
    return (
      <CSSTransitionGroup component={ this.firstChild } transitionName="expanded" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
        { preferences && (notifications === undefined || notifications === 'dismiss') &&
          <div className="chrome-browser-notice">
            { notifications === undefined &&
              <div>
                <p>We need your permission to <a onClick={this._handleEnableNotifications.bind(this)}>enable desktop notifications</a></p>
                <div className="chrome-browser-notice-dismiss" onClick={this._handleDenyNotifications.bind(this, 'dismiss')}>
                  <i className="remove icon"></i>
                </div>
              </div>
            }
            { notifications === 'dismiss' &&
              <p>
                We strongly recommend enabling desktop notifications on this computer!<br />
                <a onClick={this._handleEnableNotifications.bind(this)}>Enable desktop notifications</a> &nbsp;&bull;&nbsp;
                <a onClick={this._handleDenyNotifications.bind(this, 'now')}>Ask me next time</a> &nbsp;&bull;&nbsp;
                <a onClick={this._handleDenyNotifications.bind(this, 'never')}>Never ask again on this computer</a>
              </p>
            }
          </div>
        }
      </CSSTransitionGroup>
    )
  }

  componentDidMount() {
    this.props.onLoadPreferences()
  }

  componentDidUpdate(prevProps) {
    const { preferences, notifications } = this.props
    if(prevProps.preferences !== preferences && prevProps.preferences === null && preferences.notifications !== 'never' && Notification && Notification.permission === 'default') {
      this.props.onSavePreferences(_.omit(preferences, ['notifications']))
    }
    if(prevProps.notifications !== notifications && notifications.length > 0) {
      const index = notifications.length - 1
      const notification = notifications[index]
      this._handleNotification(notification.title, notification.body)
      this.context.notifications.clear(index)
    }
  }

  firstChild(props) {
    const childrenArray = React.Children.toArray(props.children)
    return childrenArray[0] || null
  }

  _handleNotification(title, body, icon) {
    const { preferences } = this.props
    const { history } = this.context
    if(preferences.notifications === 'granted') {
      const notification = new Notification(title, {
        title,
        body,
        icon: '/images/cornell.jpg'
      })
      notification.onclick = (event) => {
        history.push({ pathname: '/admin' })
        event.target.close()
        event.preventDefault()
      }
    }
  }

  _handleDenyNotifications(severity) {
    const { preferences, onSavePreferences, onSetPreference } = this.props
    if(severity === 'never') {
      onSavePreferences({
        ...preferences,
        notifications: 'never'
      })
    } else if (severity === 'now') {
      onSetPreference('notifications', 'denied')
    } else if (severity === 'dismiss') {
      onSetPreference('notifications', 'dismiss')
    }
  }

  _handleEnableNotifications() {
    const { preferences, team, onSavePreferences } = this.props
    Notification.requestPermission(status => {
      onSavePreferences({
        ...preferences,
        notifications: status
      })
      if(status == 'granted') {
        this._handleNotification(team.title, 'Thank you for enabling notifications!', team.logo)
      }
    })
  }

}

const mapStateToProps = state => ({
  preferences: state.browser.preferences,
  notifications: state.notifications,
  permission: state.browser.permission,
  team: getActiveTeam(state)
})

const mapDispatchToProps = {
  onSetPreference: actions.setPreference,
  onSavePreferences: actions.savePreferences,
  onLoadPreferences: actions.loadPreferences,
  pushNotification: actions.pushNotification,
  clearNotification: actions.clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)
