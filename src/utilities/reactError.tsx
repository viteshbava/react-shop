/* our own custom error class (an extension of the built in Error class) */

interface MyKnownError {
  title?: string;
  message: string;
  statusCode?: number;
}

class ReactError extends Error {
  title?: string;

  statusCode?: number;

  constructor({ title, message, statusCode }: MyKnownError) {
    super(message);
    this.title = title;
    this.statusCode = statusCode;
  }
}

export default ReactError;
export type { MyKnownError };
