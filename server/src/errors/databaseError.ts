import { CustomError } from "./customError";

class DatabaseError extends CustomError {
    statusCode = 500;
    reason = 'Failed to connect to database';

    constructor() {
        super('Failed to connect to database');
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}

export { DatabaseError };
