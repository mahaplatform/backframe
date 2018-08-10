import statusCodes from '../utils/status_codes'
import Responder from './responder'

class JsonResponder extends Responder {

  render() {

    this.res.status(200).json({
      meta: {
        success: true,
        status: statusCodes[200],
        message: 'Success'
      },
      ...this.pagination ? { pagination: this.pagination } : {},
      data: this.data
    })

  }

}

export default JsonResponder
