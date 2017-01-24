
import _ from 'lodash'
import { flattenKeys } from '../utils'

export default (all, total, limit, skip, records, options, req, res, next) => {

  const keys = flattenKeys(records[0])

  const output = records.reduce((output, record) => {
    return [
      ...output,
      keys.map(key => {
        return _.get(record, key)
      })
    ]
  }, [keys.join(',')]).join('\n')

  res.status(200).type('text/plain').send(output)
  next()

}
