import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { RequestErrorCodes } from "../../constants/ErrorCodes";
import { CustomError } from "../../errors/CustomError";

export const loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors
        .array()
        .map(
          (err) =>
            new CustomError(400, RequestErrorCodes.INVALID_INPUT, err.msg, {
              field: err.param,
            }),
        );

      return next(errorsArray);
    }
    next();
  },
];
