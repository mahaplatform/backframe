import _ from 'lodash'
import { succeed } from '../utils/response'

export default (pagination, data, req, res, resolve, reject) => {

  const extra = (req.query.$page) ? { pagination, data } : { data }

  const message = _.isArray(data) ? `Sucessfully found records` : `Sucessfully found record`

  succeed(res, 200, message, extra)

  resolve()

}
