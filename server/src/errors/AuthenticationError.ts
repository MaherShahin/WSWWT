import { CustomError } from './CustomError';
import { AuthErrorCodes } from '../constants/ErrorCodes';

export class AuthenticationError extends CustomError {
  constructor(message = 'Authentication failed.', errorCode=AuthErrorCodes.AUTHENTICATION_FAILED, details?: any) {
    super(401, errorCode, message, details);
  }
}