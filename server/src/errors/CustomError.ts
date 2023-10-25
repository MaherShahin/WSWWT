export class CustomError extends Error {
  httpStatus: number;
  errorCode: string;
  details?: any;

  constructor(
    httpStatus: number,
    errorCode: string,
    message: string,
    details?: any,
  ) {
    super(message);
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.details = details;
  }

  serializeErrors() {
    return {
      errorCode: this.errorCode,
      httpStatus: this.httpStatus,
      message: this.message,
      details: this.details,
    };
  }
}
