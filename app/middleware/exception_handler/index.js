import { fail } from 'app/utils/responses'

export default (err, req, res, next) => {

  fail(res, 500, err.message)

}
