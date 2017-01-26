import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Host extends React.Component {

  static childContextTypes = {
    notifications: React.PropTypes.object
  }

  static propTypes = {
    notifications: React.PropTypes.object
  }

  render() {
    return this.props.children
  }

  getChildContext() {
    const { push, clear } = this.props
    return {
      notifications: {
        push,
        clear
      }
    }
  }

  _handlePushNotification() {

  }

}

const mapStateToProps = (state, props) => ({
  notifictions: state.notifictions
})

const mapDispatchToProps = {
  push: actions.push,
  clear: actions.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(Host)
