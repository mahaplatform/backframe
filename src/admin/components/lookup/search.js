import React from 'react'
import component from 'admin/components/component'
import $ from 'jquery'
import _ from 'lodash'
import * as actions from './actions'

class Search extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const { label, results, selected, text } = this.props
    return (
      <div className="chrome-modal-panel">
       <div className="chrome-modal-panel-header">
         <div className="chrome-modal-panel-header-cancel" onClick={ this._handleCancel.bind(this) }>
           <i className="chevron left icon" />
           Cancel
         </div>
         <div className="chrome-modal-panel-header-title">
           Choose {label}
         </div>
         <div className="chrome-modal-panel-header-proceed" />
       </div>
       <div className="chrome-modal-panel-body">
         <div className="lookup-panel-search">
           <div className="ui form">
            <input type="text" placeholder={`Find a ${label}...`} onChange={this._handleLookup.bind(this)} ref="query" />
           </div>
         </div>
         { results && !_.isEmpty(results) &&
           <div className="lookup-panel-results">
             { results.map((result, index) => {
               return (
                 <div key={`result_${index}`} className="lookup-panel-result" onClick={ this._handleChoose.bind(this, index) }>
                   <div className="lookup-panel-result-label">
                     { _.get(result, text) }
                   </div>
                   <div className="lookup-panel-result-icon">
                     { index === selected ? <i className="green check icon" /> : null }
                   </div>
                 </div>
               )
             })}
           </div>
         }
       </div>
     </div>
    )
  }

  componentDidMount() {
    const query = $(this.refs.query)
    setTimeout(function() { query.focus() }, 500)
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleCancel() {
    this.context.modal.pop()
    this.props.onCancel()
  }

  _handleLookup(event) {
    const params = { $filter: { q: event.target.value }, $sort: this.props.sort }
    this.props.onLookup(this.props.cid, params, this.props.endpoint)
  }

  _handleChoose(index) {
    const chosen = this.props.results[index]
    const value = _.get(chosen, this.props.value)
    this.context.modal.pop()
    this.props.onChoose(index)
    this.props.onChange(value)
  }

}

const mapStateToProps = (state, props) => ({
  active: state.lookup[props.cid].active,
  selected: state.lookup[props.cid].selected,
  results: state.lookup[props.cid].results
})

const mapDispatchToProps = {
  onBegin: actions.begin,
  onCancel: actions.cancel,
  onChoose: actions.choose
}

export default component(mapStateToProps, mapDispatchToProps, Search, 'lookup', false)
