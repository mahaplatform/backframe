import _ from 'lodash'
import moment from 'moment'
import { coerceArray, selectedLabels, selectedKeys } from '../utils/core'

export default (separator) => (pagination, result, req, res, resolve, reject) => {

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

  res.status(200).type('text/plain').send(output)

  resolve()

}
