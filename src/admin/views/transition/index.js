import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

export class Transition extends React.Component {

  render() {
    const { children, location } = this.props
    const transitionName = location.state || 'next'
    return (
      <CSSTransitionGroup component='div' transitionName={ transitionName } transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
        { React.cloneElement(children, { key: location.pathname }) }
      </CSSTransitionGroup>
    )
  }

  firstChild(props) {
    const childrenArray = React.Children.toArray(props.children)
    return childrenArray[0] || null
  }

}

export default Transition
