import { serializeRecord } from './utils'
import { succeed } from 'platform/utils/responses'

export default (options) => {

  return (req, res, next) => {

    const data = serializeRecord(req.resource, options.serializer, req.query.$select)

    succeed(res, 200, `Sucessfully found ${options.name}`, data)

    next()

  }

}
