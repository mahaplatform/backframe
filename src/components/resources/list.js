import _ from 'lodash'
import { defaultQuery, defaultRenderer, defaultResponder } from '../../utils'
import { castColumn, coerceArray } from '../../utils/core'
import { extractSort, filter } from '../../utils/list'
import { checkPermitted } from '../../utils/options'
import BackframeError from '../../utils/error'

export default (buildRoute) => {

  const beforeProcessor = options => req => {

    if(req.query.$filter) {

      const allowed = [
        ...options.filterParams,
        ...options.virtualFilters,
        'q'
      ]

      checkPermitted(req.query.$filter, allowed, 'Unable to filter on the keys {unpermitted}. Please add it to filterParams')

      if(req.query.$filter.q && !options.searchParams && process.env.NODE_ENV == 'development') {
        throw new BackframeError({ code: 412, message: 'Unable to search on q without searchParams' })
      }

    }

    if(req.query.$sort) {

      const sort = req.query.$sort.split(',').map(sort => sort.replace('-', ''))

      checkPermitted(sort, options.sortParams, 'Unable to sort on the keys {unpermitted}. Please add it to sortParams')

    }

  }

  const processor = options => (req, trx) => {

    const tableName = options.model.extend().__super__.tableName

    req.query.$filter = _.pick(req.query.$filter, [...options.filterParams, 'q'])

    const fetchOptions = options.withRelated ? { withRelated: coerceArray(options.withRelated), transacting: trx } : { transacting: trx }

    const limit = parseInt(_.get(req.query, '$page.limit') || options.defaultLimit)

    const skip = parseInt(_.get(req.query, '$page.skip') || 0)

    const query = qb => {

      qb = defaultQuery(options)(req, trx, qb)

      if(options.searchParams && req.query.$filter && req.query.$filter.q) {

        const vector = options.searchParams.map(param => {

          return `coalesce(${castColumn(tableName, param)}, '')`

        }).join(' || ')

        const term = req.query.$filter.q.toLowerCase().replace(' ', '%')

        qb.whereRaw(`lower(${vector}) LIKE '%${term}%'`)

      }

      if(req.query.$filter) filter(options, qb, req.query.$filter)

      if(req.query.$exclude_ids) qb.whereNotIn(`${tableName}.id`, req.query.$exclude_ids)

      if(req.query.$ids) qb.whereIn(`${tableName}.id`, req.query.$ids)

      return qb

    }

    let allQueryObject = null

    options.model.query(qb => {

      qb = defaultQuery(options)(req, trx, qb)

      if(options.softDelete) qb = qb.whereNull('deleted_at')

      allQueryObject = qb.toSQL()

    })

    const all = () => options.knex.raw(`select count(*) as count from (${allQueryObject.sql}) as temp`, allQueryObject.bindings).transacting(trx)

    const countQueryObject = query(options.knex(tableName)).toSQL()

    const count = () => options.knex.raw(`select count(*) as count from (${countQueryObject.sql}) as temp`, countQueryObject.bindings).transacting(trx)

    const paged = () => options.model.query(qb => {

      const sort = extractSort(req.query.$sort, options.defaultSort, options.sortParams)

      qb = query(qb)

      if(limit > 0) qb.limit(limit).offset(skip)

      if(sort) sort.map(item => qb.orderByRaw(`${castColumn(tableName, item.key)} ${item.order}`))

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
    action: 'list',
    method: 'get',
    path: '',
    beforeProcessor,
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully found records')
  })

}
