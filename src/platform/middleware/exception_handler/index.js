import { fail } from 'platform/utils/responses'

export default (err, req, res, next) => {

  if(err.constructor.name === 'PlatformError') {
    fail(res, err.code, err.message, err.data)
  } else  {
    fail(res, 500, err.message)
  }

  next()

}
