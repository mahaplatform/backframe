import React from 'react'
import Panel from './panel'
import { connect } from 'react-redux'
import * as actions from './actions'
import _ from 'lodash'

class Filter extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  static propTypes = {
    fields: React.PropTypes.array,
    filters: React.PropTypes.object,
    params: React.PropTypes.object,
    query: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onChoose: React.PropTypes.func,
    onLoad: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onResetAll: React.PropTypes.func,
    onSet: React.PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  render() {
    const { fields, results } = this.props
    return (
      <div className="filters">
        <div className="filter-tokens">
          { fields.map(field => {
            if(results[field.name]) {
              if(_.isArray(results[field.name])) {
                return results[field.name].map((filter, index) => {
                  return (
                    <span key={`filter_${index}`} className="ui small basic button">
                      <span className="label" onClick={ this._handleOpen.bind(this) }>
                        { filter.value }
                      </span>
                      <i className="remove icon" onClick={ this._handleRemove.bind(this, field.name, index) } />
                    </span>
                  )
                })
              } else if(_.isObject(results[field.name])) {
                return (
                  <span className="ui small basic button">
                    <span className="label" onClick={ this._handleOpen.bind(this) }>
                      { results[field.name].value }
                    </span>
                    <i className="remove icon" onClick={ this._handleRemove.bind(this, field.name) } />
                  </span>
                )
              }
            }
          }) }
          { fields &&
            <a onClick={ this._handleOpen.bind(this) } className="ui small basic add button">
              <i className="plus icon" />
              Add Filter
            </a>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._loadFilters()
  }

  componentDidUpdate(prevProps) {
    const { results } = this.props
    if(results !== prevProps.results) {
      this._handleChange()
    }
  }

  componentWillUnmount() {
    this.props.onResetAll()
  }

  _loadFilters() {
    const { fields, filters, onLoad, onSet } = this.props
    if(fields && filters) {
      fields.map(field => {
        if(filters[field.name]) {
          if(field.endpoint) {
            onLoad(field.name, field.endpoint, field.value, field.text, filters[field.name])
          } else {
            onSet(field.name, filters[field.name])
          }
        }
      })
    }
  }

  _handleChange() {
    const { results } = this.props
    const filters = Object.keys(results).reduce((filters, key) => {
      return {
        ...filters,
        [key]: (_.isArray(results[key])) ? { $in: results[key].map(item => item.key) } : { $eq: results[key].key }
      }
    }, {})
    this.props.onChange(filters)
  }

  _handleChoose(key) {
    this._handleOpen()
    this.props.onChoose(key)
  }

  _handleOpen() {
    this.context.tray.open(<Panel fields={ this.props.fields } />)
  }

  _handleRemove(key, index) {
    this.props.onRemove(key, index)
  }

}

const mapStateToProps = state => ({
  results: state.filter.results
})

const mapDispatchToProps = {
  onChoose: actions.choose,
  onLoad: actions.load,
  onRemove: actions.remove,
  onResetAll: actions.resetAll,
  onSet: actions.set
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
