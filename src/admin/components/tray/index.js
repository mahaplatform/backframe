import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

class Tray extends React.Component {

  static childContextTypes = {
    tray: React.PropTypes.object
  }

  static propTypes = {
    tray: React.PropTypes.object,
    open: React.PropTypes.func,
    close: React.PropTypes.func
  }

  render() {
    const { children, tray } = this.props
    return (
      <div className="chrome-tray">
        { children }
        <CSSTransitionGroup transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
          { tray && <div className="chrome-tray-overlay" onClick={this._handleCloseTray.bind(this)} /> }
          { tray &&
            <div className="chrome-tray-panel">
              { _.isFunction(tray.component) ? React.createElement(tray.component) : tray.component }
            </div>
          }
        </CSSTransitionGroup>
      </div>
    )
  }

  getChildContext() {
    return {
      tray: {
        open: this._handleOpenTray.bind(this),
        close: this._handleCloseTray.bind(this)
      }
    }
  }

  _handleOpenTray(component, location) {
    this.props.open(component, location)
  }

  _handleCloseTray() {
    this.props.close()
  }

}

const mapStateToProps = (state, props) => ({
  tray: state.tray
})

const mapDispatchToProps = {
  open: actions.open,
  close: actions.close
}

export default connect(mapStateToProps, mapDispatchToProps)(Tray)
