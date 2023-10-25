import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse } from "../types/ApiErrorResponse";
import { CustomError } from "../errors/CustomError";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (Array.isArray(err) && err.every((e) => e instanceof CustomError)) {
    const apiError = new ApiErrorResponse(
      {
        errorCode: "MULTIPLE_ERRORS",
        message: "Multiple validation errors occurred",
        httpStatus: 400,
      },
      err,
    );
    apiError.send(res);
    return;
  }

  if (err instanceof CustomError) {
    const apiError = new ApiErrorResponse(err, [err.serializeErrors()]);
    apiError.send(res);
    return;
  }

  const genericError = new ApiErrorResponse({
    errorCode: "INTERNAL_ERROR",
    message: "Internal Server Error",
    httpStatus: 500,
  });
  genericError.send(res);
}
