import { fail } from '../../utils/response'

export default  (req, res) => fail(res, 404, 'Unable to locate route')
