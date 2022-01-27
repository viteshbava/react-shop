// our own custom error class (an extension of the built in Error class)
class ReactError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ReactError;
