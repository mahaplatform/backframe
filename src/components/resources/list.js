import Promise from 'bluebird'
import _ from 'lodash'
import { defaultQuery, defaultRenderer } from '../../utils'
import { coerceArray, toList } from '../../utils/core'
import { extractSort, filter } from '../../utils/list'
import CSVRenderer from '../../renderers/csv'
import JSONRenderer from '../../renderers/json'
import XLSXRenderer from '../../renderers/xlsx'
import XMLRenderer from '../../renderers/xml'

export default (buildRoute) => {

  const beforeHooks = options => (req, resolve, reject) => {

    if(req.query.$filter) {

      const unpermitted = Object.keys(req.query.$filter).filter(key => {
        return !_.includes(coerceArray(options.filterParams), key) && key !== 'q'
      })

      if(unpermitted.length > 0 && process.env.NODE_ENV == 'development') {
        return reject({ code: 412, message: `Unable to filter on the keys ${toList(unpermitted)}` })
      }

      if(req.query.$filter.q && !options.searchParams && process.env.NODE_ENV == 'development') {
        return reject({ code: 412, message: 'Unable to search on q without searchParams' })
      }

    }

    if(req.query.$sort) {

      const unpermitted = req.query.$sort.filter(key => {
        return !_.includes(coerceArray(options.sortParams), key)
      })

      if(unpermitted.length > 0 && process.env.NODE_ENV == 'development') {
        return reject({ code: 412, message: `Unable to sort on the keys ${toList(unpermitted)}` })
      }

    }

    resolve()

  }

  const processor = options => (req, resolve, reject) => {

    const tableName = options.model.extend().__super__.tableName

    req.query.$filter = _.pick(req.query.$filter, options.filterParams)

    const fetchOptions = options.withRelated ? { withRelated: coerceArray(options.withRelated) } : {}

    const limit = parseInt(_.get(req.query, '$page.limit')) || 50

    const skip = parseInt(_.get(req.query, '$page.skip')) || 0

    const query = qb => {

      qb = defaultQuery(req, options, qb, req.query.$filter)

      if(options.searchParams && req.query.$filter && req.query.$filter.q) {
        const term = `%${req.query.$filter.q.toLowerCase()}%`
        const sql = options.searchParams.map(param => `LOWER(${param}) LIKE ?`).join(' OR ')
        const vars = options.searchParams.map(param => term)
        qb.whereRaw(`(${sql})`, vars)
      }

      if(req.query.$filter) {
        filter(qb, req.query.$filter)
      }

      if(req.query.$exclude_ids) {
        qb.whereNotIn(`${tableName}.id`, req.query.$exclude_ids)
      }

      if(req.query.$ids) {
        qb.whereIn(`${tableName}.id`, req.query.$ids)
      }

      return qb

    }

    const all = () => options.model.query(qb => {

      if(options.ownedByUser) {
        qb = qb.where('user_id', req.user.get('id'))
      }

      if(options.softDelete) {
        qb = qb.whereNull('deleted_at')
      }

      qb.count('*')

    }).fetchAll()


    const queryObject = query(options.knex(tableName)).toSQL()

    const count = () => options.knex.raw(`select count(*) from (${queryObject.sql}) as temp`, queryObject.bindings)

    const paged = () => options.model.query(qb => {

      const sort = extractSort(req.query.$sort, options.defaultSort, options.sortParams)

      qb = query(qb)

      if(req.query.$page) {

        qb.limit(limit).offset(skip)

      }

      if(sort) {
        sort.map(item => {
          qb.orderBy(item.key, item.order)
        })
      }

    }).fetchAll(fetchOptions).then(records => records.map(record => record))

    return Promise.all([all(), count(), paged()]).then(responses => {

      const all = parseInt(responses[0].toJSON()[0].count)

      const total = responses[1].rows[0].count ? parseInt(responses[1].rows[0].count) : 0

      const records = responses[2]

      resolve({ all, total, records, limit, skip })

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to create ${options.name}`, errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  }

  const renderer = defaultRenderer

  const responder = options => (req, res, result, resolve, reject) => {

    const pagination = _.pick(result, ['all','total','limit','skip'])

    const format = req.params.format || 'json'

    switch(format) {

      case 'csv': return CSVRenderer(',')(pagination, result.records, req, res, resolve, reject)

      case 'tsv': return CSVRenderer('\t')(pagination, result.records, req, res, resolve, reject)

      case 'xlsx': return XLSXRenderer(pagination, result.records, req, res, resolve, reject)

      case 'xml': return XMLRenderer(pagination, result.records, req, res, resolve, reject)

      case 'json': return JSONRenderer(pagination, result.records, req, res, resolve, reject)

      default: return reject({ code: 415, message: 'We dont currently support this media type' })

    }

  }

  return buildRoute({
    method: 'get',
    path: '(\.:format)?',
    beforeHooks,
    processor,
    renderer,
    responder
  })

}
