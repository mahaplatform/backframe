import { fail } from 'platform/utils/responses'

export default (err, req, res, next) => {

  if(err.constructor.name === 'PlatformError') {

    req.logger.error('ERROR', JSON.stringify(err.data))
    fail(res, err.code, err.message, err.data)

  } else  {

    req.logger.error('ERROR', JSON.stringify(err))
    fail(res, 500, err.message)

  }

  next()

}
