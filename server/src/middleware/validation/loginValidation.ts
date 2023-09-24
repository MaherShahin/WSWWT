import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../errors/validationError";

export const loginValidation = [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors.array().map(error => {
                return {
                    message: error.msg,
                    field: error.param
                };
            }));
        }
        
        next();
    },
];
