import { coerceArray, selectedLabels, selectedKeys } from '../utils/core'
import moment from 'moment'
import _ from 'lodash'

const CsvResponder = (message, pagination, result, req, res) => {

  const separator = getSeparator(req)

  const enclosure = getEnclosure(req)

  const records = coerceArray(result)

  const matrix = (_.isPlainObject(records[0])) ? toMatrix(req, records) : records

  const wrapped = matrix.map(row => row.map(col => wrapWithEnclosure(col, enclosure)))

  const output = wrapped.map(row => row.join(separator)).join('\n')

  if(req.query.download) {

    const filename = req.query.filename || 'export'

    const datestamp = moment().format('YYYYMMDDHHmm')

    const ext = (req.params.format === 'tsv') ? 'tsv' : 'csv'

    res.setHeader('Content-disposition', `attachment; filename=${filename}-${datestamp}.${ext}`)

  }

  res.status(200).type('text/plain').send(output)

}

const getSeparator = (req) => {

  if(req.query.separator) {

    if(req.query.separator === 'tab') return '\t'

    return req.query.separator
  }

  if(req.params.format === 'tsv') return '\t'

  return ','

}

const getEnclosure = (req) => {

  if(req.query.enclosure) return req.query.enclosure

  return ''

}

const toMatrix = (req, records) => {

  const labels = selectedLabels(req.query.$select, records[0])

  const keys = selectedKeys(req.query.$select, records[0])

  return records.reduce((output, record) => [

    ...output,

    keys.map(key => {

      const value = _.get(record, key)

      if(_.isDate(value))  return moment(value).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'

      return value

    })

  ], [ labels ])

}

const wrapWithEnclosure = (value, enclosure) => {
  return enclosure + value + enclosure
}

export default CsvResponder
