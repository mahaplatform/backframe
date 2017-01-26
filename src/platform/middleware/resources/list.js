import Promise from 'bluebird'
import { filter, extractFilters, extractSort, serializeRecord } from './utils'
import Error from 'platform/utils/error'
import CSVRenderer from './renderers/csv'
import JSONRenderer from './renderers/json'
import XLSXRenderer from './renderers/xlsx'
import XMLRenderer from './renderers/xml'

export default (options) => {

  return (req, res, next) => {

    const fetchOptions = (options.withRelated) ? { withRelated:  options.withRelated }: {}

    const limit = parseInt(req.query.$limit) || 50

    const skip = parseInt(req.query.$skip) || 0

    const query = qb => {

      const filters = extractFilters(req.query, req.params)

      if(options.ownedByTeam) {
        qb = qb.where('team_id', req.team.get('id'))
      }

      if(options.ownedByUser) {
        qb = qb.where('user_id', req.user.get('id'))
      }

      if(options.query) {
        qb = options.query(qb, filters)
      }

      qb = filter(qb, filters)

      if(options.filter) {
        qb = options.filter(qb, req)
      }

      if(req.query.$exclude_ids) {
        qb.whereNotIn('id', req.query.$exclude_ids)
      }

      if(req.query.$ids) {
        qb.whereIn('id', req.query.$ids)
      }

      return qb

    }

    const all = options.model.query(qb => {

      if(options.ownedByTeam) {
        qb = qb.where('team_id', req.team.get('id'))
      }

      if(options.ownedByUser) {
        qb = qb.where('user_id', req.user.get('id'))
      }

      qb.count('*')

    }).fetchAll()

    const count = options.model.query(qb => {

      qb = query(qb)

      qb.count('*')

    }).fetchAll()

    const paged = options.model.query(qb => {

      const sort = extractSort(req.query, options)

      qb = query(qb)

      if(req.query.$skip || req.query.$limit) {

        qb.limit(limit).offset(skip)

      }

      if(sort) {
        sort.map(item => {
          qb.orderBy(item.key, item.order)
        })
      }

    }).fetchAll(fetchOptions)

    Promise.all([all, count, paged]).then(responses => {

      const all = parseInt(responses[0].toJSON()[0].count)

      const total = responses[1].toJSON()[0] ? parseInt(responses[1].toJSON()[0].count) : 0

      const records = responses[2].map(record => {
        return serializeRecord(record, options.serializer, req.query.$select)
      })

      if(req.params.ext === 'csv') {
        CSVRenderer(all, total, limit, skip, records, options, req, res, next)
      } else if(req.params.ext === 'xlsx') {
        XLSXRenderer(all, total, limit, skip, records, options, req, res, next)
      } else if(req.params.ext === 'xml') {
        XMLRenderer(all, total, limit, skip, records, options, req, res, next)
      } else if(req.params.ext === 'json' || req.params.ext === undefined) {
        JSONRenderer(all, total, limit, skip, records, options, req, res, next)
      } else {
        const error = new Error({ code: 415, message: 'We dont currently support this media type'})
        next(error)
      }

      return null

    }).catch(next)

  }

}
