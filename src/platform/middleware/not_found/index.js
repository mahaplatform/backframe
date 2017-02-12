import { fail } from 'platform/utils/responses'

export default (req, res, next) => {

  if(!res._headerSent) {
    fail(res, 404, 'Unable to locate resource')
  }

  next()

}
