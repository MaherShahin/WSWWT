import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../errors/validationError";

export const registerValidation = [
    check("email", "Please include a valid email").isEmail(),
    check("username", "Username is required").notEmpty(),
    check("name", "Name is required").notEmpty(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
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