import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import _ from 'lodash'
import Format from 'admin/utils/format'

class Table extends React.Component {

  static contextTypes = {
    drawer: React.PropTypes.object,
    modal: React.PropTypes.object,
    history: React.PropTypes.object
  }

  static propTypes = {
    columns: React.PropTypes.array,
    onSort: React.PropTypes.func
  }

  render() {
    const { columns, link, modal, sort, records, status } = this.props
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
                { this.props.export && <div className="table-header mobile" onClick={ this._handleExport.bind(this) }>
                  <i className="download icon" />
                </div> }
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
                }).concat((this.props.export ? [<div key="cell_extra" className="table-cell mobile" />] : []))

                if(link) {
                  _.templateSettings.interpolate = /#{([\s\S]+?)}/g
                  const to = _.template(link)(record)
                  return (
                    <Link key={ `record_${recordIndex}` } className="table-row" to={to}>
                      { row }
                    </Link>
                  )
                } else if(modal) {
                  return (
                    <div key={ `record_${recordIndex}` } className="table-row" onClick={ this._handleModal.bind(this, record.id) }>
                      { row }
                    </div>
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

  _handleExport() {
    window.location.href = 'http://localhost:8080/api/admin/expenses/reports/expenses.csv?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODY4NzQ2NTcsImV4cCI6MTQ4ODA4NDI1NywiZGF0YSI6eyJ1c2VyX2lkIjoxfX0.g-XZWa5Vz-ePenNcn55tMb8IofkSLGIb-YkFxUiA1cE&%24page%5Bskip%5D=0&%24sort=-date'
  }

  _handleModal(id) {
    this.context.modal.push(<this.props.modal id={ id } />)
  }

  _resizeColumns() {
    $(this.refs.body).find('.table-row:first').find('.table-cell').each((index, el) => {
      const width = $(el).css('width')
      $(this.refs.head).find(`.table-row .table-header:nth-child(${index+1})`).css('width', width)
    })
  }

  _handleSort(key) {
    const { onSort } = this.props
    onSort(key)
  }

}

export default Table
