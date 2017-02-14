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
    const { prompt, selected, results, text } = this.props
    const chosen = (selected !== null) ? results[selected] : null
    return (
      <div className="lookup-field">
        <input type="text"
               onFocus={ this._handleBegin.bind(this) }
               value={ chosen ? _.get(chosen, text) : '' }
               placeholder={ prompt } />
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(prevProps.active !== active && active) {
      this.context.modal.push(<Search {...this.props} />)
    }
  }

  _handleBegin(e) {
    this.props.onBegin()
    e.target.blur()
    e.preventDefault()
    return false
  }

}

const mapStateToProps = (state, props) => ({
  active: state.lookup[props.cid].active,
  selected: state.lookup[props.cid].selected,
  results: state.lookup[props.cid].results
})

const mapDispatchToProps = {
  onBegin: actions.begin
}

export default component(mapStateToProps, mapDispatchToProps, Lookup, 'lookup', true)
