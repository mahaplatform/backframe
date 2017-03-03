import React from 'react'
import { Link } from 'react-router'
import pluralize from 'pluralize'
import _ from 'lodash'
import Filter from '../filter'
import Table from '../table'

class Results extends React.Component {

  static contextTypes = {
    infinite: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    const { all, columns, empty, entity, filters, layout, records, status } = this.props
    if(status === 'completed' && all === 0) {
      if(empty) {
        return (
          <div className="table-empty">
            <div className="table-empty-message">
              <h2><i className={`circular ${empty.icon} icon`} /></h2>
              <h3>No { _.startCase(pluralize(entity.replace('_', ' '))) }</h3>
              <p>You have not yet created any { pluralize(entity.replace('_', ' ')) }</p>
              { empty.modal &&
                <div className="ui basic button red" onClick={ this._handleAddNew.bind(this)}>
                  <i className="plus icon" />
                  Create New {_.startCase(entity.replace('_', ' '))}
                </div>
              }
            </div>
          </div>
        )
      } else  {
        return (
          <div className="table-empty">
            <div className="table-empty-message">
              <h3>No Results Found</h3>
              <p>There are no { _.startCase(pluralize(entity.replace('_', ' '))) }</p>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="collection">
          { filters &&
            <div className="collection-header">
              <Filter { ...this._getFilter() } />
            </div>
          }
          { status === 'loading' && records.length === 0 &&
            <div className="chrome-loader">
              <div className="ui active inverted dimmer">
                <div className="ui large text loader">Loading</div>
              </div>
            </div>
          }
          { status === 'completed' && columns && records.length > 0 && <Table { ...this._getTable() } /> }
          { status === 'completed' && layout && records.length > 0 && React.createElement(layout, { ...this._getLayout() }) }
          { status === 'completed' && records.length === 0 &&
            <div className="table-empty">
              <div className="table-empty-message">
                <h2><i className="circular remove icon" /></h2>
                <h3>No Results Found</h3>
                <p>No records matched your query</p>
              </div>
            </div>
          }
          { status === 'failure' &&
            <div className="chrome-error">
              <div className="chrome-error-message">
                <i className="warning sign icon" />
                <h2>Unable to load<br /> records</h2>
                <Link className="ui basic red button" onClick={this._handleRefresh.bind(this)}>Try again</Link>
              </div>
            </div>
          }
        </div>
      )
    }
  }

  _getFilter() {
    const { filters, params, onFilter } = this.props
    return {
      fields: filters,
      filters: params.filter,
      onChange: onFilter
    }
  }

  _getTable() {
    const { columns, params, link, modal, records, status, onSort} = this.props
    return {
      columns,
      export: this.props.export,
      link,
      modal,
      records,
      sort: params.sort,
      status,
      onSort
    }
  }

  _getLayout() {
    const { records, status} = this.props
    return {
      records,
      status
    }
  }

  _handleRefresh() {
    this.context.infinite.refresh()
  }

  _handleAddNew() {
    this.context.modal.push(this.props.empty.modal)
  }

}

export default Results
