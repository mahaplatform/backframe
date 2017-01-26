import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import _ from 'lodash'
import Tab from './tab'
import * as actions from './actions'

export class Tabs extends React.Component {

  static propTypes = {
    tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      content: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func,
        React.PropTypes.element
      ])
    })).isRequired,
    active: React.PropTypes.number,
    onChangeTab: React.PropTypes.func
  }

  render() {
    const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','ten']
    const { active, tabs, state } = this.props
    const content = tabs[active].content
    return (
      <div className="tabs">
        <div className="tabs-menu">
          <div className={`ui ${numbers[tabs.length]} item pointing menu`}>
            {tabs.map((tab, index) => {
              let isActive = (index == active)
              return <Tab key={`tab_${index}`} active={isActive} label={tab.label} onChangeTab={this._handleChangeTab.bind(this, index)} />
            })}
          </div>
        </div>
       <div className="tab-panes">
         <CSSTransitionGroup transitionName={`slide-${state}`} component="div" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
           <div className="tab-pane" key={`pane-${active}`}>
             { _.isString(content) && <p>{content}</p> }
             { _.isElement(content) && <content { ...this.props } /> }
             { _.isFunction(content) && content(this.props) }
           </div>
         </CSSTransitionGroup>
       </div>
     </div>
    )
  }

  _handleChangeTab(index) {
    this.props.onChangeTab(index)
  }

}

const mapStateToProps = state => ({
  active: state.tabs.active,
  state: state.tabs.state
})

const mapDispatchToProps = {
  onChangeTab: actions.changeTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
