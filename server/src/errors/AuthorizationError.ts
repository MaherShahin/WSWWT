import { AuthErrorCodes } from "../constants/ErrorCodes";
import { CustomError } from "./CustomError";

export class AuthorizationError extends CustomError {
  constructor(
    message = "Unauthorized.",
    errorCode = AuthErrorCodes.UNAUTHORIZED_ACCESS,
    details?: any,
  ) {
    super(403, errorCode, message, details);
  }
}
