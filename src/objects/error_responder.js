import BackframeError from './error'
import statusCodes from './status_codes'

class ErrorResponder {

  res = null

  message = null

  constructor(config) {
    this.res = config.res
    this.error = this._getError(config.error)
  }

  render() {

    this.res.status(this.error.code).json({
      meta: {
        success: false,
        status: statusCodes[this.error.code],
        message: this.error.message
      },
      errors: this.error.errors
    })

  }

  _getError(err) {

    return (err.name !== 'BackframeError') ? new BackframeError({
      code: 500,
      message: err.message
    }) : err

  }


}

export default ErrorResponder
