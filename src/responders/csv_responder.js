import { coerceArray, selectedLabels, selectedKeys } from '../utils/core'
import moment from 'moment'
import _ from 'lodash'

const CsvResponder = (message, pagination, result, req, res) => {

  const separator = (req.params.format === 'tsv') ? '\t' : ','

  const records = coerceArray(result)

  const labels = selectedLabels(req.query.$select, records[0])

  const keys = selectedKeys(req.query.$select, records[0])

  const output = records.reduce((output, record) => {
    return [
      ...output,
      keys.map(key => {

        const value = _.get(record, key)

        if(_.isDate(value)) {

          return moment(value).format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z'

        } else {

          return value

        }

      }).join(separator)
    ]
  }, [labels.join(separator)]).join('\n')

  if(req.query.download) {

    const filename = req.query.filename || 'export'

    const datestamp = moment().format('YYYYMMDDHHmm')

    const ext = (req.params.format === 'tsv') ? 'tsv' : 'csv'

    res.setHeader('Content-disposition', `attachment; filename=${filename}-${datestamp}.${ext}`)

  }

  res.status(200).type('text/plain').send(output)

}

export default CsvResponder
