import moment from 'moment'
import _ from 'lodash'

class Renderer {

  req = null

  result = null

  trx = null

  options = null

  constructor(config = {}) {
    this.req = config.req
    this.result = config.result
    this.trx = config.trx
    this.options = config.options
  }

  async render() {

    if(!this.result) return null

    const transforms = [
      this._renderRecord.bind(this),
      ...this.req.query.$select ? [this._selectFields(this.req.query.$select)] : []
    ]

    if(this.result.records) return await this._applyToRecords(this.req, this.trx, this.result, transforms, this.options)

    return await this._applyToRecord(this.req, this.trx, this.result, transforms, this.options)

  }

  async _applyToRecords(req, trx, result, operations, options) {

    if(!operations) return result

    const records = await Promise.mapSeries(result.records, async (record) => {

      return await this._applyToRecord(req, trx, record, operations, options)

    })

    return {
      ...result,
      records
    }

  }

  async _applyToRecord(req, trx, record, operations, options) {

    return await Promise.reduce(_.castArray(operations), async (record, operation) => {

      return await operation(req, trx, record, options)

    }, record)

  }

  _getCacheKey(req, record) {

    if(!record.get('updated_at')) return null

    const url = req.path.substr(1).replace(/\//g, '-')

    const id = record.get('id')

    const timestamp = moment(record.get('updated_at')).format('x')

    return [url, id, timestamp].filter(item => item !== null).join('-')

  }

  async _cache(key, options, fn) {

    if(!options.cache || !options.redis || !key) return await fn()

    const value = await new Promise((resolve, reject) => {

      options.redis.get(key, (err, data) => {

        if(err) reject(err)

        resolve(data)

      })

    })

    if(value) return JSON.parse(value)

    const rendered = await fn()

    await options.redis.set(key, JSON.stringify(rendered), 'EX', 24 * 60 * 60)

    return rendered

  }

  async _renderRecord(req, trx, record, options) {

    if(!record.toJSON) return record

    const key = this._getCacheKey(req, record)

    const fn = async () => {

      return options.serializer ? await options.serializer(req, trx, record) : record.toJSON()

    }

    return await this._cache(key, options, fn)

  }

  _selectFields(select) {

    return (req, trx, record) => {

      const fields = this._selectedKeys(select, record)

      return select ? _.pick(record, fields) : record

    }

  }

  _selectedKeys(select, record) {

    if(_.isPlainObject(select)) return Object.values(select)

    if(_.isNil(select)) return this._flattenKeys(record)

    return _.castArray(select)

  }

  _flattenKeys(hash, prefix = '') {

    return Object.keys(hash).reduce((keys, key) => [
      ...keys,
      ..._.isObject(hash[key]) ? this._flattenKeys(hash[key], `${prefix}${key}.`) : [`${prefix}${key}`]
    ], [])

  }

}

export default Renderer
