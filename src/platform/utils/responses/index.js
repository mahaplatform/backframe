const statuses = {
  200: 'OK',
  201: 'CREATED',
  202: 'ACCEPTED',
  204: 'NO CONTENT',
  400: 'BAD REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT FOUND',
  409: 'CONFLICT',
  422: 'UNPROCESSABLE ENTRY',
  500: 'APPLICATION ERROR'
}

export const succeed = (res, code, message, extra = {}) => {
  return response(res, code, true, message, extra)
}

export const fail = (res, code, message, extra = {}) => {
  return response(res, code, false, message, extra)
}

const response = (res, code, success, message, extra) => {

  const status = statuses[code]

  res.status(code).json({
    meta: {
      success,
      status,
      message
    },
    ...extra
  })

  return null

}
