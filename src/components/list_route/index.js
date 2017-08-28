import _ from 'lodash'
import moment from 'moment'
import { defaultQuery, defaultRenderer, defaultResponder } from '../../utils'
import { castColumn, coerceArray, mergeTypes } from '../../utils/core'
import { validateOptions, defaultOptions, checkPermitted } from '../../utils/options'
import {  } from '../../utils/options'
import * as constants from '../../constants'
import buildRoute from '../route'

export default (backframeOptions = {}) => (userOptions = {}) => {

  const TYPES = mergeTypes({
    filterParams: { type: ['string','string[]'], required: false },
    sortParams: { type: ['string','string[]'], required: false },
    searchParams: { type: ['string','string[]'], required: false },
    virtualFilters: { type: ['string','string[]'], required: false }
  }, backframeOptions.plugins)

  validateOptions('list route', userOptions, TYPES)

  const options = normalizeOptions(userOptions, backframeOptions, TYPES)

  return buildListRoute(options, buildRoute(backframeOptions))

}

// normalize and merge defaut options
export const normalizeOptions = (userOptions, backframeOptions, types) => {

  return {
    defaultFormat: backframeOptions.defaultFormat,
    defaultLimit: backframeOptions.defaultLimit,
    filterParams: [],
    knex: backframeOptions.knex,
    sortParams: [],
    searchParams: [],
    virtualFilters: [],
    ...userOptions
  }

}

// convert options into route fomat { method, path, options, handler]}
export const buildListRoute = (routeOptions, buildRoute) => {

  const beforeProcessor = (req, trx, options)  => {

    if(req.query.$filter) {

      const allowed = [
        ...routeOptions.filterParams,
        ...routeOptions.virtualFilters,
        'q'
      ]

      checkPermitted(req.query.$filter, allowed, 'Unable to filter on the keys {unpermitted}. Please add it to filterParams')

      if(req.query.$filter.q && !routeOptions.searchParams && process.env.NODE_ENV == 'development') {
        throw new BackframeError({ code: 412, message: 'Unable to search on q without searchParams' })
      }

    }

    if(req.query.$sort) {

      const sort = req.query.$sort.split(',').map(sort => sort.replace('-', ''))

      checkPermitted(sort, routeOptions.sortParams, 'Unable to sort on the keys {unpermitted}. Please add it to sortParams')

    }

  }

  const processor = async (req, trx, options) => {

    const tableName = routeOptions.model.extend().__super__.tableName

    const columns = await options.knex(tableName).columnInfo()

    req.query.$filter = _.pick(req.query.$filter, [...routeOptions.filterParams, 'q'])

    const fetchOptions = routeOptions.withRelated ? { withRelated: coerceArray(routeOptions.withRelated), transacting: trx } : { transacting: trx }

    const limit = parseInt(_.get(req.query, '$page.limit') || routeOptions.defaultLimit)

    const skip = parseInt(_.get(req.query, '$page.skip') || 0)

    const query = qb => {

      defaultQuery(req, trx, qb, routeOptions)

      if(routeOptions.searchParams && req.query.$filter && req.query.$filter.q) {

        const vector = routeOptions.searchParams.map(param => {

          return `coalesce(${castColumn(tableName, param)}, '')`

        })

        if(vector.length > 0) {

          const term = req.query.$filter.q.toLowerCase().replace(' ', '%')

          qb.whereRaw(`${vector.join(' || ')} LIKE '%${term}%'`)


        }

      }

      if(req.query.$filter) filter(options, qb, req.query.$filter)

      if(req.query.$exclude_ids) qb.whereNotIn(`${tableName}.id`, req.query.$exclude_ids)

      if(req.query.$ids) qb.whereIn(`${tableName}.id`, req.query.$ids)

      return qb

    }

    let allQueryObject = null

    routeOptions.model.query(qb => {

      defaultQuery(req, trx, qb, routeOptions)

      if(routeOptions.softDelete) qb.whereNull('deleted_at')

      allQueryObject = qb.toSQL()

    })

    const all = () => options.knex.raw(`select count(*) as count from (${allQueryObject.sql}) as temp`, allQueryObject.bindings).transacting(trx)

    const countQueryObject = query(routeOptions.knex(tableName)).toSQL()

    const count = () => routeOptions.knex.raw(`select count(*) as count from (${countQueryObject.sql}) as temp`, countQueryObject.bindings).transacting(trx)

    const paged = () => routeOptions.model.query(qb => {

      const sort = extractSort(req.query.$sort, routeOptions.defaultSort, routeOptions.sortParams)

      query(qb)

      if(limit > 0) qb.limit(limit).offset(skip)

      if(sort) sort.map(item => {

        const column = castColumn(tableName, item.key)

        const isString = columns[item.key] && columns[item.key].type === 'character varying'

        qb.orderByRaw(`${column} ${item.order}`)

      })

    }).fetchAll(fetchOptions).then(records => records.map(record => record))

    return Promise.all([all(), count(), paged()]).then(responses => {

      const allResonse = responses[0].rows ? responses[0].rows[0] : responses[0][0]

      const all = allResonse.count ? parseInt(allResonse.count) : 0

      const totalResonse = responses[1].rows ? responses[1].rows[0] : responses[1][0]

      const total = totalResonse.count ? parseInt(totalResonse.count) : 0

      const records = responses[2]

      return { all, total, records, limit, skip }

    })

  }

  return buildRoute({
    method: routeOptions.method,
    path: routeOptions.path,
    beforeProcessor,
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully found records'),
    serializer: routeOptions.serializer
  })

}

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
export const filter = (options, qb, filters) => {

  Object.keys(filters).filter(key => filters[key]).map(key => {

    if(filters[key].$eq) {

      if(filters[key].$eq === 'null') {

        qb.whereNull(key)

      } else if(filters[key].$eq === 'not_null') {

        qb.whereNotNull(key)

      } else {

        qb.whereRaw(`lower(${key}) = ?`, filters[key].$eq.toLowerCase())

      }

    } else if(filters[key].$ne) {

      qb.whereNot(key, filters[key].$ne)

    } else if(filters[key].$lk) {

      qb.whereRaw(`lower(${key}) like ?`, `%${filters[key].$lk.toLowerCase()}%`)

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

        daterange(qb, key, 0, 'week')

      } else if(filters[key].$dr === 'last_week') {

        daterange(qb, key, -1, 'week')

      } else if(filters[key].$dr === 'next_week') {

        daterange(qb, key, 1, 'week')

      } else if(filters[key].$dr === 'this_month') {

        daterange(qb, key, 0, 'month')

      } else if(filters[key].$dr === 'last_month') {

        daterange(qb, key, -1, 'month')

      } else if(filters[key].$dr === 'next_month') {

        daterange(qb, key, 1, 'month')

      } else if(filters[key].$dr === 'this_quarter') {

        daterange(qb, key, 0, 'quarter')

      } else if(filters[key].$dr === 'last_quarter') {

        daterange(qb, key, -1, 'quarter')

      } else if(filters[key].$dr === 'next_quarter') {

        daterange(qb, key, 1, 'quarter')

      } else if(filters[key].$dr === 'this_year') {

        daterange(qb, key, 0, 'year')

      } else if(filters[key].$dr === 'last_year') {

        daterange(qb, key, -1, 'year')

      } else if(filters[key].$dr === 'next_year') {

        daterange(qb, key, 1, 'year')

      }

    }

  })

}

export const daterange = (qb, field, quantity, unit) => {

  qb.where(field, '>=', moment().add(quantity, unit).startOf(unit).format('YYYY-MM-DD'))

  qb.where(field, '<=', moment().add(quantity, unit).endOf(unit).format('YYYY-MM-DD'))

}
