import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'
import Fields from './fields'
import Select from './select'
import DateRange from './daterange'

class Index extends React.Component {

  static propTypes = {
    fields: React.PropTypes.array,
    path: React.PropTypes.array,
    state: React.PropTypes.string
  }

  render() {
    const { active, fields } = this.props
    return (
      <div className="filter">
        <Fields fields={ fields } />
        <ReactCSSTransitionGroup transitionName='stack' component={ this._firstChild } transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          { active !== null && fields[active].type === 'select' && <Select { ...fields[active]} /> }
          { active !== null && fields[active].type === 'daterange' && <DateRange { ...fields[active]} /> }
        </ReactCSSTransitionGroup>
      </div>
    )
  }

  componentWillUnmount() {
    this.props.onRestart()
  }

  _firstChild(props) {
    const childrenArray = React.Children.toArray(props.children)
    return childrenArray[0] || null
  }

}

const mapStateToProps = state => ({
  active: state.filter.active
})

const mapDispatchToProps = {
  onReset: actions.reset,
  onRestart: actions.restart
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
