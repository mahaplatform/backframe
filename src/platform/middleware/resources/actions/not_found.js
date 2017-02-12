import { fail } from 'platform/utils/responses'

export default (req, res, next) => {

    fail(res, 404, 'Unable to locate route')

}
