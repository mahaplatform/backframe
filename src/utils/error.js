class BackframeError extends Error {

  constructor({ code, message, errors }) {
    super(message);
    this.name = 'BackframeError';
    this.code = code;
    this.message = message;
    this.errors = errors;
  }

}

export default BackframeError
