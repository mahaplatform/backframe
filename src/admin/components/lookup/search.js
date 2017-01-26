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
    const { label, results, selected, value } = this.props
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
                     { _.get(result, value) }
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
    this.props.onLookup(this.props.cid, '', this.props.endpoint)
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
    this.props.onLookup(this.props.cid,event.target.value, this.props.endpoint)
  }

  _handleChoose(index) {
    this.context.modal.pop()
    this.props.onChoose(index)
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
  onChoose: actions.choose,
  onLookup: actions.lookup
}

export default component(mapStateToProps, mapDispatchToProps, Search, 'lookup', false)
