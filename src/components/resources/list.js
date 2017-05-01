import _ from 'lodash'
import { defaultQuery, defaultRenderer, defaultResponder } from '../../utils'
import { coerceArray } from '../../utils/core'
import { extractSort, filter } from '../../utils/list'
import { checkPermitted } from '../../utils/options'
import BackframeError from '../../utils/error'

export default (buildRoute) => {

  const beforeHooks = options => req => {

    if(req.query.$filter) {

      checkPermitted(req.query.$filter, [...options.filterParams, 'q'], 'Unable to filter on the keys {unpermitted}. Please add it to filterParams')

      if(req.query.$filter.q && !options.searchParams && process.env.NODE_ENV == 'development') {
        throw new BackframeError({ code: 412, message: 'Unable to search on q without searchParams' })
      }

    }

    if(req.query.$sort) {
      checkPermitted(req.query.$sort, options.sortParams, 'Unable to sort on the keys {unpermitted}. Please add it to sortParams')
    }

  }

  const processor = options => (req, trx) => {

    const tableName = options.model.extend().__super__.tableName

    req.query.$filter = _.pick(req.query.$filter, options.filterParams)

    const fetchOptions = options.withRelated ? { withRelated: coerceArray(options.withRelated), transacting: trx } : { transacting: trx }

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

      qb.count('* as count')

    }).fetchAll({ transacting })


    const queryObject = query(options.knex(tableName)).toSQL()

    const count = () => options.knex.raw(`select count(*) as count from (${queryObject.sql}) as temp`, queryObject.bindings).transacting(transacting)

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

      const totalResonse = responses[1].rows ? responses[1].rows[0] : responses[1][0]

      const total = totalResonse.count ? parseInt(totalResonse.count) : 0

      const records = responses[2]

      return { all, total, records, limit, skip }

    }).catch(err => {

      if(err.errors) throw new BackframeError({ code: 422, message: `Unable to create ${options.name}`, errors: err.toJSON() })

      throw err

    })

  }

  return buildRoute({
    method: 'get',
    path: '',
    beforeHooks,
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully found records')
  })

}
