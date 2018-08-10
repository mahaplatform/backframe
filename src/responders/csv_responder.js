import Responder from './responder'
import moment from 'moment'
import _ from 'lodash'

class CsvResponder extends Responder {

  render() {

    const separator = this._getSeparator()

    const enclosure = this._getEnclosure()

    const records = _.castArray(this.data)

    const matrix = (_.isPlainObject(records[0])) ? this._toMatrix(records) : records

    const wrapped = matrix.map(row => row.map(col => this._wrapWithEnclosure(col, enclosure)))

    const output = wrapped.map(row => row.join(separator)).join('\r\n')

    if(this.req.query.download) {

      const filename = this.req.query.filename || 'export'

      const datestamp = moment().format('YYYYMMDDHHmm')

      const ext = (this.req.params.format === 'tsv') ? 'tsv' : 'csv'

      res.setHeader('Content-disposition', `attachment; filename=${filename}-${datestamp}.${ext}`)

    }

    this.res.status(200).type('text/plain').send(output)

  }

  _getSeparator() {

    if(this.req.query.separator) {

      if(this.req.query.separator === 'tab') return '\t'

      return this.req.query.separator

    }

    if(this.req.params.format === 'tsv') return '\t'

    return ','

  }

  _getEnclosure() {

    if(this.req.query.enclosure) return this.req.query.enclosure

    return ''

  }

  _toMatrix(records) {

    const labels = this._selectedLabels(this.req.query.$select, records[0])

    const keys = this._selectedKeys(this.req.query.$select, records[0])

    return records.reduce((output, record) => [

     ...output,

     keys.map(key => {

       const value = _.get(record, key)

       if(_.isDate(value))  return moment(value).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'

       return value

     })

    ], [ labels ])

  }

  _wrapWithEnclosure(value, enclosure) {
    return enclosure + value + enclosure
  }


}

export default CsvResponder
