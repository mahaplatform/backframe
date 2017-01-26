
import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Flash extends React.Component {

  static childContextTypes = {
    flash: React.PropTypes.object
  }

  static propTypes = {
    flash: React.PropTypes.object,
    onSet: React.PropTypes.func.isRequired,
    onClear: React.PropTypes.func.isRequired
  }

  render() {
    const { children, flash } = this.props
    return (
      <div className="chrome-flash">
        { children }
        <CSSTransitionGroup transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          {flash &&
            <div className={`chrome-flash-popup ${flash.style}`}>
              <p>
                { this._getIcon(flash.style) }
                { flash.message }
              </p>
            </div>
          }
        </CSSTransitionGroup>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { flash, onClear } = this.props
    if(prevProps.flash !== flash && flash) {
      window.setTimeout(onClear , 2000)
    }
  }

  _getIcon(style) {
    if(style == 'success') {
      return <i className="check circle icon" />
    } else if(style == 'info') {
      return <i className="info circle icon" />
    } else if(style == 'warning') {
      return <i className="warning sign icon" />
    } else if(style == 'error') {
      return <i className="remove circle icon" />
    }
  }

  getChildContext() {
    const { onSet, onClear } = this.props
    return {
      flash: {
        set: onSet,
        clear: onClear
      }
    }
  }

}

const mapStateToProps = state => ({
  flash: state.flash
})

const mapDispatchToProps = {
  onSet: actions.set,
  onClear: actions.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash)
