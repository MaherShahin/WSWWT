import { CustomError } from "./customError";

export class ValidationError extends CustomError {
    statusCode: number;

    constructor(message: string) {
        super(message, 400);
    }
}
