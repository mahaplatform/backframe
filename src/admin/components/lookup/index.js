import React from 'react'
import component from 'admin/components/component'
import _ from 'lodash'
import * as actions from './actions'
import Search from './search'

class Lookup extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  static propTypes = {
    active: React.PropTypes.bool
  }

  render() {
    const { disabled, prompt, selected, results, text } = this.props
    const chosen = (selected !== null) ? results[selected] : null
    const value = chosen ? _.get(chosen, text) : ''
    return (
      <div className="lookup-field">
        <input type="text"
               disabled={disabled}
               onFocus={ this._handleBegin.bind(this) }
               value={value}
               placeholder={ prompt } />
             { chosen &&
               <div className="lookup-field-clear">
                 <i className="icon circle remove" onClick={ this._handleClear.bind(this) } />
               </div>
             }
       </div>
    )
  }

  componentDidMount() {
    this.props.onLookup(this.props.cid, '', this.props.endpoint)
  }

  componentDidUpdate(prevProps) {
    const { active, disabled } = this.props
    if(prevProps.active !== active && active) {
      this.context.modal.push(<Search {...this.props} />)
    } else if(prevProps.disabled !== disabled) {
      this.props.onClear()
    }
  }

  _handleBegin(e) {
    this.props.onBegin()
    e.target.blur()
    e.preventDefault()
    return false
  }

  _handleClear() {
    this.props.onClear()
  }

}

const mapStateToProps = (state, props) => ({
  active: state.lookup[props.cid].active,
  selected: state.lookup[props.cid].selected,
  results: state.lookup[props.cid].results
})

const mapDispatchToProps = {
  onBegin: actions.begin,
  onClear: actions.clear,
  onLookup: actions.lookup
}

export default component(mapStateToProps, mapDispatchToProps, Lookup, 'lookup', true)
