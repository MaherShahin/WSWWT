import { CustomError } from "./customError";

class NotFoundError extends CustomError {
    statusCode = 404;

    constructor(public message: string = 'Resource not found') {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export { NotFoundError };
