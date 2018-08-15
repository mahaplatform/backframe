import FilterSort from '../utils/filter_sort'
import Route from '../route'
import _ from 'lodash'

class ListRoute extends Route {

  constructor(config = {}) {
    super(config)
    if(config.defaultQuery) this.setDefaultQuery(config.defaultQuery)
    if(config.defaultSort) this.setDefaultSort(config.defaultSort)
    if(config.filterParams) this.setFilterParams(config.filterParams)
    if(config.model) this.setModel(config.model)
    if(config.searchParams) this.setSearchParams(config.searchParams)
    if(config.sortParams) this.setSortParams(config.sortParams)
    if(config.withRelated) this.setWithRelated(config.withRelated)
    this.setAction('list')
    this.setMethod('get')
    this.setPath('')
    this.setProcessor(this._processor)
  }

  setDefaultQuery(defaultQuery) {
    this._setOption('defaultQuery', _.castArray(defaultQuery))
  }

  setDefaultSort(defaultSort) {
    this._setOption('defaultSort', _.castArray(defaultSort))
  }

  setModel(model) {
    this._setOption('model', model)
  }

  setFilterParams(filterParams) {
    this._setOption('filterParams', _.castArray(filterParams))
  }

  setSearchParams(searchParams) {
    this._setOption('searchParams', _.castArray(searchParams))
  }

  setSortParams(sortParams) {
    this._setOption('sortParams', _.castArray(sortParams))
  }

  setWithRelated(withRelated) {
    this._setOption('withRelated', _.castArray(withRelated))
  }

  async _processor(req, trx, options) {

    const filterSort = new FilterSort(options)

    const limit = parseInt(_.get(req.query, '$page.limit') || options.defaultLimit)

    const skip = parseInt(_.get(req.query, '$page.skip') || 0)

    const all = () => this._countRecords(req, trx, filterSort, 'applyShared', options)

    const count = () => this._countRecords(req, trx, filterSort, 'apply', options)

    const paged = () => options.model.query(qb => {

      filterSort.apply(req, trx, qb, options)

      if(limit > 0) qb.limit(limit).offset(skip)

    }).fetchAll({
      transacting: trx,
      withRelated: options.withRelated ? _.castArray(options.withRelated): []
    })

    const responses = await Promise.all([all(), count(), paged()])

    return {
      all: parseInt(responses[0].rows[0].count),
      total: parseInt(responses[1].rows[0].count),
      records: responses[2].toArray(),
      limit,
      skip
    }

  }

  _countRecords(req, trx, filter, fn, options) {

    const tableName = options.model.extend().__super__.tableName

    const query = filter[fn](req, trx, options.knex(tableName), options).toSQL()

    return options.knex.raw(`select count(*) as count from (${query.sql}) as temp`, query.bindings).transacting(trx)

  }

}

export default ListRoute
