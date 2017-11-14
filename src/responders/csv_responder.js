import { coerceArray, selectedLabels, selectedKeys } from '../utils/core'
import moment from 'moment'
import _ from 'lodash'

const CsvResponder = (message, pagination, result, req, res) => {

  const separator = (req.params.format === 'tsv') ? '\t' : ','

  const records = coerceArray(result)

  const matrix = (_.isPlainObject(records[0])) ? toMatrix(req, records) : records

  const output = matrix.map(row => row.join(separator)).join('\n')

  if(req.query.download) {

    const filename = req.query.filename || 'export'

    const datestamp = moment().format('YYYYMMDDHHmm')

    const ext = (req.params.format === 'tsv') ? 'tsv' : 'csv'

    res.setHeader('Content-disposition', `attachment; filename=${filename}-${datestamp}.${ext}`)

  }

  res.status(200).type('text/plain').send(output)

}

const toMatrix = (req, records) => {

  const separator = (req.params.format === 'tsv') ? '\t' : ','

  const enclosure = req.query.enclosure || ''

  const labels = selectedLabels(req.query.$select, records[0])

  const keys = selectedKeys(req.query.$select, records[0])

  return records.reduce((output, record) => [

    ...output,

    keys.map(key => {

      const value = _.get(record, key)

      if(_.isDate(value))  return wrapWithEnclosure(moment(value).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z', enclosure)

      return wrapWithEnclosure(value, enclosure)

    })

  ], [ labels.map(label => wrapWithEnclosure(label, enclosure)) ])

}

const wrapWithEnclosure = (value, enclosure) => {
  return enclosure + value + enclosure
}

export default CsvResponder
