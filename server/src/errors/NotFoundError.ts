import { CustomError } from './CustomError';
import { GeneralErrorCodes } from '../constants/ErrorCodes';

export class NotFoundError extends CustomError {
  constructor(message = 'User not found.', errorCode = GeneralErrorCodes.ITEM_NOT_FOUND,  details?: any) {
    super(404, errorCode, message, details);
  }
}
