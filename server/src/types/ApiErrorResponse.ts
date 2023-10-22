import { ApiResponse } from "./ApiResponse";

export type StandardErrorObject = {
    errorCode: string;
    message: string;
    httpStatus: number;
    details?: any;
}

export class ApiErrorResponse extends ApiResponse<StandardErrorObject> {
    constructor(errorObject: StandardErrorObject, errors?: any) {
        super(errorObject.message, null, errorObject.httpStatus, errors || null);
    }
}
