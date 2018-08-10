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
      this._renderRecord,
      ...this.req.query.$select ? [this._selectFields(this.req.query.$select)] : []
    ]

    if(this.result.records) return await this._applyToRecords(this.req, this.trx, this.result, transforms, this.options)

    console.log(this.result)

    return await this._applyToRecord(this.req, this.trx, this.result, transforms, this.options)

  }

  async _applyToRecords(req, trx, result, operations, options) {

    if(!operations) return result

    const records = await Promise.map(result.records, async (record) => {

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

  async _renderRecord(req, trx, result, options) {

    if(_.isPlainObject(result) || _.isNil(options.serializer)) return result.toJSON()

    return await options.serializer(req, trx, result)

  }

  _selectFields(select) {

    return (req, trx, record) => {

      const fields = selectedKeys(select, record)

      return select ? _.pick(record, fields) : record

    }

  }

}

export default Renderer
