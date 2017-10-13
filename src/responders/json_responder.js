import _ from 'lodash'
import { succeed } from '../utils/response'

const JsonResponder = (message, pagination, data, req, res) => {

  const extra = (!_.isEmpty(pagination)) ? { pagination, data } : { data }

  succeed(res, 200, message, extra)

}

export default JsonResponder
