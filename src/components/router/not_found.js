import { fail } from '../../utils/response'

const processor = (req, resolve, reject) => resolve()

const responder = (req, res, data, resolve, reject) => {

  const result = fail(res, 404, 'Unable to locate route')

  resolve(result)

}

export default { processor, responder }
