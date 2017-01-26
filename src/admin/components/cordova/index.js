import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Cordova extends React.Component {

  static childContextTypes = {
    cordova: React.PropTypes.object
  }

  static propTypes = {
    status_bar: React.PropTypes.bool.isRequired,
    hideStatusBar: React.PropTypes.func.isRequired,
    showStatusBar: React.PropTypes.func.isRequired
  }

  render() {
    const { children } = this.props
    return (
      <div className="chrome-cordova">
        { children }
      </div>
    )
  }
  componentDidMount() {
    _handleStatusBar()
  }

  componentDidUpdate(prevProps) {
    const { status_bar } = this.props
    try {
      if(status_bar !== prevProps.status_bar) {
        this._handleStatusBar()
      }
    } catch(err) {}
  }

  _handleStatusBar() {
    const { status_bar } = this.props
    if(status_bar) {
      window.StatusBar.show()
    } else  {
      window.StatusBar.hide()
    }
  }

  getChildContext() {
    const { hideStatusBar, showStatusBar } = this.props
    return {
      cordova: {
        hideStatusBar,
        showStatusBar
      }
    }
  }

}

const mapStateToProps = state => ({
  status_bar: state.cordova.status_bar
})

const mapDispatchToProps = {
  onEnable: actions.enable,
  hideStatusBar: actions.hideStatusBar,
  showStatusBar: actions.hideStatusBar
}

export default connect(mapStateToProps, mapDispatchToProps)(Cordova)
