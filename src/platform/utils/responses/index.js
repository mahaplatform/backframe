const statuses = {
  200: 'OK',
  201: 'CREATED',
  202: 'ACCEPTED',
  204: 'NO CONTENT',
  400: 'BAD REQUEST',
  403: 'FORBIDDEN',
  404: 'NOT FOUND',
  409: 'CONFLICT',
  415: 'UNSUPPORTED MEDIA TYPE',
  422: 'UNPROCESSABLE ENTRY',
  500: 'APPLICATION ERROR'
}

export const succeed = (res, code, message, data = null) => {

  const success = true
  const status = statuses[code]

  res.status(code).json({
    meta: {
      success,
      status,
      message
    },
    data
  })

}

export const fail = (res, code, message, error = null) => {

  const success = false
  const status = statuses[code]

  res.status(code).json({
    meta: {
      success,
      status,
      message
    },
    error
  })

}
