import { fail } from 'platform/utils/responses'

export default (err, req, res, next) => {

  if(err.constructor.name === 'PlatformError') {
    req.logger('ERROR', err.data)
    fail(res, err.code, err.message, err.data)
  } else  {
    console.log(err)
    req.logger('ERROR', err)
    fail(res, 500, err.message)
  }

  next()

}
