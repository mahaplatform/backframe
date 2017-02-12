import Promise from 'bluebird'
import _ from 'lodash'
import knex from 'platform/services/knex'
import { coerceArray, defaultQuery, filterParams, applyToRecords, resourceRenderer } from '../utils'
import { extractSort, filter, selectFields } from '../utils/list'

import CSVRenderer from '../renderers/csv'
import JSONRenderer from '../renderers/json'
import XLSXRenderer from '../renderers/xlsx'
import XMLRenderer from '../renderers/xml'

export default options => {

  const processor = req => {

    const withRelated = options.withRelated.list || options.withRelated.all

    const fetchOptions = withRelated ? { withRelated:  coerceArray(withRelated) } : {}

    const limit = parseInt(_.get(req.query, '$page.limit')) || 50

    const skip = parseInt(_.get(req.query, '$page.skip')) || 0

    const query = qb => {

      qb = defaultQuery(req, options, 'list', qb, filters)

      const filters = filterParams(req.query.$filter, options.filterParams)

      if(filters) {
        filter(qb, filters)
      }

      if(req.query.$exclude_ids) {
        qb.whereNotIn('id', req.query.$exclude_ids)
      }

      if(req.query.$ids) {
        qb.whereIn('id', req.query.$ids)
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

    const tableName = options.model.extend().__super__.tableName

    const queryObject = query(knex(tableName)).toSQL()

    const count = () => knex.raw(`SELECT COUNT(*) FROM (${queryObject.sql}) AS temp`, queryObject.bindings)

    // const count = () => options.model.query(qb => {
    //
    //   qb = query(qb)
    //
    //   qb.count('*')
    //
    // }).fetchAll()

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

    }).fetchAll(fetchOptions)

    return Promise.all([all(), count(), paged()]).then(responses => {

      const all = parseInt(responses[0].toJSON()[0].count)

      const total = responses[1].rows[0].count ? parseInt(responses[1].rows[0].count) : 0

      const records = responses[2]

      return { all, total, records, limit, skip }

    })

  }

  const renderer = (req, result) => {

    const serializer = options.serializer.list || options.serializer.all

    const renderer = resourceRenderer(serializer, options)

    const selecter = selectFields(req.query.$select)

    return applyToRecords(req, result, [renderer, selecter])

  }

  const responder = (req, res, next, result) => {

    if(req.params.ext === 'csv') {
      return CSVRenderer(result.all, result.total, result.limit, result.skip, result.records, ',', options, req, res, next)
    } else if(req.params.ext === 'tsv') {
      return CSVRenderer(result.all, result.total, result.limit, result.skip, result.records, '\t', options, req, res, next)
    } else if(req.params.ext === 'xlsx') {
      return XLSXRenderer(result.all, result.total, result.limit, result.skip, result.records, options, req, res, next)
    } else if(req.params.ext === 'xml') {
      return XMLRenderer(result.all, result.total, result.limit, result.skip, result.records, options, req, res, next)
    } else if(req.params.ext === 'json' || req.params.ext === undefined) {
      return JSONRenderer(result.all, result.total, result.limit, result.skip, result.records, options, req, res, next)
    } else {
      return Promise((resolve, reject) => {
        reject({ code: 415, message: 'We dont currently support this media type' })
      })
    }

  }

  return { processor, renderer, responder }

}
