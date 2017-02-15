import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import _ from 'lodash'
import Format from 'admin/utils/format'

class Table extends React.Component {

  static propTypes = {
    columns: React.PropTypes.array,
    onSort: React.PropTypes.func
  }

  render() {
    const { columns, link, sort, records, status } = this.props
    if(records.length > 0) {
      return (
        <div className="collection-layout">
          <div className="table">
            <div className="table-head">
              <div className="table-row">
                {columns.map((column, index) => {
                  const classes = (column.primary) ? 'table-header mobile' : 'table-header'
                  return (
                    <div key={ `fixed_header_${index}` } className={ classes } onClick={ this._handleSort.bind(this, column.key) }>
                      { column.label }
                      { (sort.key == column.key) && ((sort.order == 'asc') ? <i className="chevron up icon" /> : <i className="chevron down icon" />) }
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="table-body">
              {records.map((record, recordIndex) => {
                const row = columns.map((column, columnIndex) => {
                  const value = _.get(record, column.key)
                  const classes = (column.primary) ? 'table-cell mobile' : 'table-cell'
                  return (
                    <div key={ `cell_${recordIndex}_${columnIndex}` } className={ classes }>
                      <Format {...record} format={column.format} value={value} />
                    </div>
                  )
                })
                if(link) {
                  _.templateSettings.interpolate = /#{([\s\S]+?)}/g
                  const to = _.template(link)(record)
                  return (
                    <Link to={to} key={ `record_${recordIndex}` } className="table-row">
                      { row }
                    </Link>
                  )
                } else {
                  return (
                    <div key={ `record_${recordIndex}` } className="table-row">
                      { row }
                    </div>
                  )
                }
              })}
            </div>
          </div>
          { status === 'loading' &&
            <div className="chrome-infinite-loader">
              <div className="ui active inverted dimmer">
                <div className="ui small loader"></div>
              </div>
            </div>
          }
        </div>
      )
    } else {
      return null
    }
  }

  componentDidMount() {
    this._resizeColumns()
  }

  componentDidUpdate() {
    this._resizeColumns()
  }

  _resizeColumns() {
    $(this.refs.body).find('.table-row:first').find('.table-cell').each((index, el) => {
      const width = $(el).css('width')
      $(this.refs.head).find(`.table-row .table-header:nth-child(${index+1})`).css('width', width)
    })
  }

  _handleSort(key) {
    const { cid, onSort } = this.props
    onSort(cid, key)
  }

}

export default Table
