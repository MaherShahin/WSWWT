import { CustomError } from "./customError";

class ValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: { message: string; field?: string }[]) {
        super();
        this.errors = errors;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }


    serializeErrors() {
        return this.errors;
    }
}

export { ValidationError };
