import xml from 'xml'
import _ from 'lodash'
import { coerceArray } from '../utils/core'

export default (pagination, result, req, res, resolve, reject) => {

  const toXML = (hash) => {

    return Object.keys(hash).map(key => {

      const value = hash[key]

      return { [key]: (_.isPlainObject(value) ? toXML(value) : value) }

    })
  }

  const paginationSegment = {
    pagination: [
      { all: pagination.all },
      { total: pagination.total },
      { limit: pagination.limit },
      { skip: pagination.skip }
    ]
  }

  const records = coerceArray(result)

  const dataSegment = {
    data: records.map(record => ({
      record: toXML(record)
    }))
  }

  const data = xml({
    response: (req.query.$page) ? [
      paginationSegment,
      dataSegment
    ] : [ dataSegment ]
  }, true)

  res.status(200).type('application/xml').send(data)

  resolve()

}
