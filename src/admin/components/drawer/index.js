import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

class Drawer extends React.Component {

  static childContextTypes = {
    drawer: React.PropTypes.object
  }

  static contextTypes = {
    cordova: React.PropTypes.object
  }

  static propTypes = {
    drawer: React.PropTypes.object,
    open: React.PropTypes.func,
    close: React.PropTypes.func
  }

  render() {
    const { children, drawer } = this.props
    return (
      <div className="chrome-drawer">
        { children }
        <CSSTransitionGroup transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
          { drawer && <div className="chrome-drawer-overlay" onClick={this._handleCloseDrawer.bind(this)} /> }
          { drawer &&
            <div className={`chrome-drawer-panel chrome-drawer-panel-${drawer.location}`}>
              { React.createElement(drawer.component) }
            </div>
          }
        </CSSTransitionGroup>
      </div>
    )
  }

  getChildContext() {
    return {
      drawer: {
        open: this._handleOpenDrawer.bind(this),
        close: this._handleCloseDrawer.bind(this)
      }
    }
  }

  _handleOpenDrawer(component, location) {
    if(this.props.host === 'cordova') {
      this.context.cordova.hideStatusBar()
    }
    this.props.open(component, location)
  }

  _handleCloseDrawer() {
    if(this.props.host === 'cordova') {
      this.context.cordova.showStatusBar()
    }
    this.props.close()
  }

}

const mapStateToProps = (state, props) => ({
  host: state.host.style,
  drawer: state.drawer
})

const mapDispatchToProps = {
  open: actions.open,
  close: actions.close
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
