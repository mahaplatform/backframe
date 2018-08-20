import moment from 'moment'
import _ from 'lodash'

class FilterSort {

  defaultQuery = null

  defaultSort = null

  knex = null

  model = null

  filters = null

  filterParams = null

  searchParams = null

  sortParams = []

  constructor(options) {
    this.defaultQuery = options.defaultQuery
    this.defaultSort = options.defaultSort
    this.knex = options.knex
    this.model = options.model
    this.filterParams = options.filterParams
    this.searchParams = options.searchParams
    this.sortParams = options.sortParams
  }

  applyShared(req, trx, qb, options) {

    this._filterShared(req, trx, qb, options)

    return qb

  }

  apply(req, trx, qb, options) {

    const tableName = this.model.extend().__super__.tableName

    const filters = this._getAllowedFilters(req.query.$filter, this.filterParams)

    const virtualFilters = this._getAllowedVirtualFilters(req.query.$filter, this.virtualFilters)

    const sort = this._getAllowedSort(req.query.$sort, this.sortParams, this.defaultSort)

    if(virtualFilters) this._filterVirtual(qb, virtualFilters)

    if(filters.q && this.searchParams) this._filterSearch(qb, tableName, this.searchParams, filters.q)

    if(req.query.$exclude_ids) this._filterExcludeIds(qb, tableName, req.query.$exclude_ids)

    if(req.query.$ids) this._filterIncludeIds(qb, tableName, req.query.$ids)

    this._filterShared(req, trx, qb, options)

    if(filters) this._filterRecords(qb, filters, tableName)

    if(sort) this._sortRecords(qb, sort, tableName)

    return qb

  }

  _getAllowedFilters(filters, filterParams = []) {

    return _.pick(filters, [...filterParams, 'q'])

  }

  _getAllowedVirtualFilters(filters, virtualFiters) {

    if(!filters || !virtualFiters) return null

    return _.pick(filters, Object.keys(virtualFiters))

  }

  _getAllowedSort(sort, sortParams, defaultSort) {

    if(!sort) return defaultSort || null

    return _.castArray(sort).filter(item => {

      return _.includes(sortParams, item.replace(/^-/, ''))

    })

  }

  _filterVirtual(qb, virtualFilters) {

    Object.keys(virtualFilters).map(key => {

      if(!virtualFilters[key]) return

      virtualFilters[key](qb, virtualFilters[key])

    })

  }

  _filterSearch(qb, tableName, searchParams, q) {

    if(!q) return

    const vector = searchParams.map(param => {

      return `coalesce(${this._castColumn(tableName, param)}, '')`

    }).join(' || ')

    const term = q.toLowerCase().replace(' ', '%')

    qb.whereRaw(`lower(${vector}) LIKE '%${term}%'`)

  }

  _filterExcludeIds(qb, tableName, ids) {

    qb.whereNotIn(`${tableName}.id`, ids)

  }

  _filterIncludeIds(qb, tableName, ids) {

    qb.whereIn(`${tableName}.id`, ids)

  }

  _filterShared(req, trx, qb, options) {

    if(this.defaultQuery) this._filterDefault(this.defaultQuery, req, trx, qb, options)

    if(this.softDelete) this._filterSoftDelete(qb)

  }

  _filterDefault(defaultQuery, req, trx, qb, options) {

    _.castArray(defaultQuery).map(query => {

      query(req, trx, qb, options)

    })

  }

  _filterSoftDelete(qb) {

    qb.whereNull('deleted_at')

  }

  _filterRecords(qb, filters, tableName) {

    Object.keys(filters).filter(key => filters[key]).map(key => {

      const column = this._castColumn(tableName, key)

      this._filterColumn(qb, column, filters[key])

    })

  }

  _filterColumn(qb, column, filter) {

    if(filter.$eq) {

      this._filterEqual(qb, column, filter.$eq)

    } else if(filter.$ne) {

      this._filterNotEqual(qb, column, filter.$ne)

    } else if(filter.$lk) {

      this._filterLike(qb, column, filter.$lk)

    } else if(filter.$in) {

      this._filterIn(qb, column, filter.$in)

    } else if(filter.$nin) {

      this._filterNotIn(qb, column, filter.$nin)

    } else if(filter.$lt) {

      this._filterLessThan(qb, column, filter.$lt)

    } else if(filter.$lte) {

      this._filterLessThanEqualTo(qb, column, filter.$lte)

    } else if(filter.$gt) {

      this._filterGreaterThan(qb, column, filter.$gt)

    } else if(filter.$gte) {

      this._filterGreaterThanEqualTo(qb, column, filter.$gte)

    } else if(filter.$dr) {

      this._filterDateRange(qb, column, filter.$dr)

    }

  }

  _filterEqual(qb, column, value) {

    if(value === 'null') return qb.whereNull(column)

    if(value === 'not_null') return qb.whereNotNull(column)

    if(value === 'true') return qb.where(column, true)

    if(value === 'false') return qb.where(column, false)

    if(value.match(/^\d*$/)) return qb.where(column, value)

    return qb.whereRaw(`lower(${column}) = ?`, value.toLowerCase())

  }

  _filterNotEqual(qb, column, value) {

    qb.whereNot(column, value)

  }

  _filterLike(qb, column, value) {

    qb.whereRaw(`lower(${column}) like ?`, `%${value.toLowerCase()}%`)

  }

  _filterIn(qb, column, value) {

    const inArray = _.without(value, 'null')

    if(!_.includes(value, 'null')) return qb.whereIn(column, inArray)

    qb.where(function() {

      this.whereIn(column, inArray).orWhereNull(column)

    })

  }

  _filterNotIn(qb, column, value) {

    const inArray = _.without(value, 'null')

    if(!_.includes(value, 'null')) return qb.whereNotIn(column, inArray)

    qb.where(function() {

      this.whereNotIn(column, inArray).orWhereNotNull(column)

    })

  }

  _filterLessThan(qb, column, value) {

    qb.where(column, '<', value)

  }

  _filterLessThanEqualTo(qb, column, value) {

    qb.where(column, '<=', value)

  }

  _filterGreaterThan(qb, column, value) {

    qb.where(column, '>', value)

  }

  _filterGreaterThanEqualTo(qb, column, value) {

    qb.where(column, '>=', value)

  }

  _filterDateRange(qb, column, value) {

    if(value === 'this_week') {

      this._filterRange(qb, column, 0, 'week')

    } else if(value === 'last_week') {

      this._filterRange(qb, column, -1, 'week')

    } else if(value === 'next_week') {

      this._filterRange(qb, column, 1, 'week')

    } else if(value=== 'this_month') {

      this._filterRange(qb, column, 0, 'month')

    } else if(value === 'last_month') {

      this._filterRange(qb, column, -1, 'month')

    } else if(value === 'next_month') {

      this._filterRange(qb, column, 1, 'month')

    } else if(value === 'this_quarter') {

      this._filterRange(qb, column, 0, 'quarter')

    } else if(value === 'last_quarter') {

      this._filterRange(qb, column, -1, 'quarter')

    } else if(value === 'next_quarter') {

      this._filterRange(qb, column, 1, 'quarter')

    } else if(value === 'this_year') {

      this._filterRange(qb, column, 0, 'year')

    } else if(value === 'last_year') {

      this._filterRange(qb, column, -1, 'year')

    } else if(value === 'next_year') {

      this._filterRange(qb, column, 1, 'year')

    } else if(value=== 'last_30') {

      this._filterDuration(qb, column, -30, 'day')

    } else if(value === 'next_30') {

      this._filterDuration(qb, column, 30, 'day')

    } else if(value === 'last_60') {

      this._filterDuration(qb, column, -60, 'day')

    } else if(value === 'next_60') {

      this._filterDuration(qb, column, 60, 'day')

    } else if(value === 'last_90') {

      this._filterDuration(qb, column, -90, 'day')

    } else if(value=== 'next_90') {

      this._filterDuration(qb, column, 90, 'day')

    } else if(value === 'ytd') {

      this._filterBetween(qb, column, moment().startOf('year'), moment())

    } else if(value === 'ltd') {

      this._filterBetween(qb, column, moment('2000-01-01'), moment())

    }

  }

  _filterRange(qb, column, quantity, unit) {

    this._filterBetween(qb, column, moment().add(quantity, unit).startOf(unit), moment().add(quantity, unit).endOf(unit))

  }

  _filterDuration(qb, column, quantity, unit) {

    if(quantity > 0) {

      this._filterBetween(qb, column, moment().startOf(unit), moment().add(quantity, unit).endOf(unit))

    } else {

      this._filterBetween(qb, column, moment().add(quantity, unit).endOf(unit), moment().startOf(unit))

    }

  }

  _filterBetween(qb, column, start, end) {

    qb.where(column, '>=', start.format('YYYY-MM-DD'))

    qb.where(column, '<=', end.format('YYYY-MM-DD'))

  }

  _sortRecords(qb, sorts, tableName) {

    _.castArray(sorts).map(sort => {

      const key = sort.replace(/^-/, '')

      const order = sort[0] === '-' ? 'desc' : 'asc'

      const column = this._castColumn(tableName, key)

      qb.orderByRaw(`${column} ${order}`)

    })

  }

  _castColumn(tableName, column) {

    const matches = column.match(/(.*)\.(.*)/)

    return matches ? column : `${tableName}.${column}`

  }

}

export default FilterSort
