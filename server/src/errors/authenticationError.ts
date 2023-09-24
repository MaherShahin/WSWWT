import { CustomError } from "./customError";

class AuthenticationError extends CustomError {
    statusCode = 401;

    constructor(public message: string = 'Not authenticated') {
        super(message);
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export { AuthenticationError };
