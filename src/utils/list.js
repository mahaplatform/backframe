import _ from 'lodash'
import { coerceArray } from './core'
import moment from 'moment'

// takes sort param and converts to sort array
export const extractSort = (query, defaults, allowedParams = []) => {

  if(query) {
    query = coerceArray(query).filter(item => _.includes(allowedParams, item.replace('-', '')))
  }

  const sort = query || defaults || null

  if(!sort) return null

  return coerceArray(sort).map(item => ({
    key: item.replace('-', ''),
    order: (item[0] === '-') ? 'desc' : 'asc'
  }))

}

// map query filters to a qb object
export const filter = (qb, filters) => {

  return Object.keys(filters).filter(key => filters[key]).reduce((qb, key) => {

    if(filters[key].$eq) {

      if(filters[key].$eq === 'null') {

        qb.whereNull(key)

      } else if(filters[key].$eq === 'not_null') {

        qb.whereNotNull(key)

      } else {

        qb.where(key, filters[key].$eq)

      }

    } else if(filters[key].$ne) {

      qb.whereNot(key, filters[key].$ne)

    } else if(filters[key].$lk) {

      qb.whereRaw(`LOWER(${key}) LIKE ?`, `%${filters[key].$lk.toLowerCase()}%`)

    } else if(filters[key].$in) {

      const inArray = _.without(filters[key].$in, 'null')
      if(_.includes(filters[key].$in, 'null')) {
        qb.where(function() {
          this.whereIn(key, inArray).orWhereNull(key)
        })
      } else {
        qb.whereIn(key, inArray)
      }

    } else if(filters[key].$nin) {

      const inArray = _.without(filters[key].$nin, 'null')
      if(_.includes(filters[key].$nin, 'null')) {
        qb.where(function() {
          this.whereNotIn(key, inArray).orWhereNotNull(key)
        })
      } else {
        qb.whereNotIn(key, inArray)
      }

    } else if(filters[key].$lt) {

      qb.where(key, '<', filters[key].$lt)

    } else if(filters[key].$lte) {

      qb.where(key, '<=', filters[key].$lte)

    } else if(filters[key].$gt) {

      qb.where(key, '>', filters[key].$gt)

    } else if(filters[key].$gte) {

      qb.where(key, '>=', filters[key].$gte)

    } else if(filters[key].$dr) {

      if(filters[key].$dr === 'this_week') {

        qb = daterange(qb, key, 0, 'week')

      } else if(filters[key].$dr === 'last_week') {

        qb = daterange(qb, key, -1, 'week')

      } else if(filters[key].$dr === 'next_week') {

        qb = daterange(qb, key, 1, 'week')

      } else if(filters[key].$dr === 'this_month') {

        qb = daterange(qb, key, 0, 'month')

      } else if(filters[key].$dr === 'last_month') {

        qb = daterange(qb, key, -1, 'month')

      } else if(filters[key].$dr === 'next_month') {

        qb = daterange(qb, key, 1, 'month')

      } else if(filters[key].$dr === 'this_quarter') {

        qb = daterange(qb, key, 0, 'quarter')

      } else if(filters[key].$dr === 'last_quarter') {

        qb = daterange(qb, key, -1, 'quarter')

      } else if(filters[key].$dr === 'next_quarter') {

        qb = daterange(qb, key, 1, 'quarter')

      } else if(filters[key].$dr === 'this_year') {

        qb = daterange(qb, key, 0, 'year')

      } else if(filters[key].$dr === 'last_year') {

        qb = daterange(qb, key, -1, 'year')

      } else if(filters[key].$dr === 'next_year') {

        qb = daterange(qb, key, 1, 'year')

      }

    }

    return qb

  }, qb)

}

export const daterange = (qb, field, quantity, unit) => {

  qb.where(field, '>=', moment().add(quantity, unit).startOf(unit).format('YYYY-MM-DD')).where(field, '<=', moment().add(quantity, unit).endOf(unit).format('YYYY-MM-DD'))

  return qb

}
