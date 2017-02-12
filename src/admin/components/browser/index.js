import React from 'react'
import { connect } from 'react-redux'
import Notifications from './notifications'

class Browser extends React.Component {

  static contextTypes = {
    notifications: React.PropTypes.object,
    history: React.PropTypes.object
  }

  static propTypes = {
    permissions: React.PropTypes.object,
    preferences: React.PropTypes.object
  }

  render() {
    const { children, preferences } = this.props
    return (
      <div className="chrome-browser">
        <div className="chrome-browser-main">
          { children }
          { preferences && preferences.notifications === 'denied' && <Notifications /> }
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  preferences: state.browser.preferences
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser)
