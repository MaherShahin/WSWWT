import { DatabaseErrorCodes } from "../constants/ErrorCodes";

import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {
    constructor(message = 'Database error.', details?: any) {
      super(500, DatabaseErrorCodes.CONNECTION_FAILURE, message, details);
    }
  }