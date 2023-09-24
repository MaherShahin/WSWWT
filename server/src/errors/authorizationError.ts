import { CustomError } from "./customError";

class AuthorizationError extends CustomError {
    statusCode = 403;

    constructor(public message: string = 'Not authorized') {
        super(message);
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export { AuthorizationError };
