import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from './actions'

class Modal extends React.Component {

  static childContextTypes = {
    modal: React.PropTypes.object
  }

  static propTypes = {
    components: React.PropTypes.array,
    onPop: React.PropTypes.func,
    onPush: React.PropTypes.func
  }

  render() {
    const { children, components } = this.props
    return (
      <div className="chrome-modal">
        { children }
        <CSSTransitionGroup transitionName="expanded" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          { components.length > 0 && <div className="chrome-modal-overlay" onClick={this._handleClose.bind(this)} /> }
          { components.length > 0 &&
            <div className="chrome-modal-window">
              <CSSTransitionGroup transitionName="stack" component="div" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
                { components.map((component, index) => {
                  return _.isFunction(component) ? React.createElement(component, { key: `modal_panel_${index}` }) : component
                }) }
              </CSSTransitionGroup>
            </div>
          }
        </CSSTransitionGroup>
      </div>
    )
  }

  _handleClose() {
    this.props.onClose()
  }

  getChildContext() {
    const { onClose, onPop, onPush } = this.props
    return {
      modal: {
        close: onClose,
        pop: onPop,
        push: onPush
      }
    }
  }

}

const mapStateToProps = (state, props) => ({
  components: state.modal
})

const mapDispatchToProps = {
  onClose: actions.close,
  onPop: actions.pop,
  onPush: actions.push
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
