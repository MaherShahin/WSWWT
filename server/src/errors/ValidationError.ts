import { DatabaseErrorCodes, RequestErrorCodes } from "../constants/ErrorCodes";

import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
    constructor(message = 'Validation error.', details?: any) {
      super(500, RequestErrorCodes.VALIDATION_ERROR, message, details);
    }
  }