import { fail } from '../../utils/response'

const processor = req => ''

const responder = (req, res, data) => {

  return fail(res, 404, 'Unable to locate route')

}

export default { processor, responder }
