import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Electron extends React.Component {

  static contextTypes = {
    notifications: React.PropTypes.object
  }

  static propTypes = {
    notifications: React.PropTypes.array
  }

  render() {
    const { children } = this.props
    return (
      <div className="chrome-electron">
        { children }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { notifications } = this.props
    if(prevProps.notifications !== notifications && notifications.length > 0) {
      const index = notifications.length - 1
      const notification = notifications[index]
      this._handleNotification(notification.title, notification.body)
      this.context.notifications.clear(index)
    }
  }

  _handleNotification(title, body) {
    new Notification(title, {
      title,
      body
    })
  }

}

const mapStateToProps = state => ({
  notifications: state.notifications
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Electron)
