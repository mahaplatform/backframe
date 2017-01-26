import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

export class Search extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object,
    history: React.PropTypes.object
  }

  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    choice: React.PropTypes.number,
    focused: React.PropTypes.bool,
    query: React.PropTypes.string,
    results: React.PropTypes.array,
    onResetSearch: React.PropTypes.func.isRequired,
    onAbortSearch: React.PropTypes.func.isRequired,
    onCompleteSearch: React.PropTypes.func.isRequired,
    onLookup: React.PropTypes.func.isRequired
  }

  render() {
    const { focused, results, query } = this.props
    return (
      <div className={ focused ? 'chrome-search-panel focused' : 'chrome-search-panel' }>
        <div className="chrome-search-bar">
          <div className="chrome-search-form">
            <div className="chrome-search-input">
              <i className="search icon" />
              <div className="ui input">
                <input type="text" placeholder="Search" ref="query" onChange={this._handleLookup.bind(this)} onFocus={this._handleFocus.bind(this)} onBlur={this._handleBlur.bind(this)} value={query} />
              </div>
              { query.length > 0 && <i className="remove circle icon" onClick={this._handleResetSearch.bind(this)} /> }
            </div>
          </div>
          <div className="chrome-search-cancel" onClick={this._handleAbortSearch.bind(this)}>
            Cancel
          </div>
        </div>
        { !results &&
          <div className="chrome-search-landing">
            <div className="chrome-search-landing-message">
              <h2>
                <i className="circular search icon" />
              </h2>
              <h3>Search for anything</h3>
            </div>
          </div>
        }
        { results && _.isEmpty(results) &&
          <div className="chrome-search-landing">
            <div className="chrome-search-landing-message">
              <h2>
                <i className="circular remove icon" />
              </h2>
              <h3>No results matched your query</h3>
            </div>
          </div>
        }
        { results && !_.isEmpty(results) &&
          <div className="chrome-search-results">
            {Object.keys(results).map((model, modelIndex) => {
              if(results[model].length) {
                return (
                  <div key={`model_${modelIndex}`} className="chrome-search-section">
                    <div className="chrome-search-model" >
                      {model}
                    </div>
                    {results[model].map((result, index) => {
                      return (
                        <div key={`result_${modelIndex}_${index}`} className="chrome-search-result" onClick={this._handleCompleteSearch.bind(this, model, index)}>
                          <p>
                            <strong>{result.text}</strong><br />
                            {result.subtext}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )
              }
            })}
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const query = this.refs.query
    window.setTimeout(function() {
      query.focus()
    }, 600)
  }

  componentDidUpdate(prevProps) {
    const { choice } = this.props
    if(prevProps.choice !== choice) {
      this.context.history.push({ pathname: choice.route, state: 'static' })
      this.context.modal.pop()
    }
  }

  _handleFocus() {
    this.props.onFocusSearch()
  }

  _handleBlur() {
    const { onAbortSearch } = this.props
    window.setTimeout(function() {
      onAbortSearch()
    }, 250)
  }

  _handleResetSearch() {
    this.props.onResetSearch()
  }

  _handleAbortSearch() {
    this.context.modal.pop()
  }

  _handleCompleteSearch(model, index) {
    this.props.onCompleteSearch(model, index)
  }

  _handleLookup(event) {
    this.props.onLookup(event.target.value)
  }

}

const mapStateToProps = state => ({
  ...state.search
})

const mapDispatchToProps = {
  onAbortSearch: actions.abortSearch,
  onCompleteSearch: actions.completeSearch,
  onFocusSearch: actions.focusSearch,
  onLookup: actions.lookup,
  onResetSearch: actions.resetSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
