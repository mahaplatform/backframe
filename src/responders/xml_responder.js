import xml from 'xml'
import _ from 'lodash'
import { coerceArray } from '../utils/core'

export default (message, pagination, result, req, res) => {

  const toXML = (hash) => {

    return Object.keys(hash).map(key => {

      const value = hash[key]

      return { [key]: (_.isPlainObject(value) ? toXML(value) : value) }

    })
  }

  const paginationSegment = pagination ? {
    pagination: [
      { all: pagination.all },
      { total: pagination.total },
      { limit: pagination.limit },
      { skip: pagination.skip }
    ]
  } : null

  const records = coerceArray(result)

  const dataSegment = {
    data: records.map(record => ({
      record: toXML(record)
    }))
  }

  const data = xml({
    response: pagination ? [
      paginationSegment,
      dataSegment
    ] : [dataSegment]
  }, true)

  if(req.query.download) {
    const datestamp = moment().format('YYYYMMDDHHmm')
    res.setHeader('Content-disposition', `attachment; filename=export-${datestamp}.xml`);
  }

  res.status(200).type('application/xml').send(data)

}
