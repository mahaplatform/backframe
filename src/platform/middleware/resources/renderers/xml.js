import Promise from 'bluebird'
import xml from 'xml'
import _ from 'lodash'
import { flattenKeys } from '../utils'

export default (all, total, limit, skip, records, options, req, res, next) => {

  return new Promise((resolve, reject) => {

    const keys = flattenKeys(records[0])

    const data = xml({
      data: [
        { all },
        { total },
        { limit },
        { skip },
        {
          records: records.map(record => {
            return {
              record: keys.map(key => {
                return {
                  [key]: _.get(record, key)
                }
              })
            }
          })
        }
      ]
    }, true)

    res.status(200).type('application/xml').send(data)

    next()

    resolve()

  })

}
