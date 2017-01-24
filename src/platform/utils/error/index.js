
export default class PlatformError {

  constructor(error) {
    this.code = error.code
    this.message = error.message
    this.data = error.data
  }

  code() {
    return this.code
  }

  message() {
    return this.message
  }

  data() {
    return this.data
  }

}
