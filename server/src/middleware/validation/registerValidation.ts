import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../errors/ValidationError";
import { RequestErrorCodes } from "../../constants/ErrorCodes";
import { CustomError } from "../../errors/CustomError";

export const registerValidation = [
    check("email", "Please include a valid email").isEmail(),
    check("username", "Username is required").notEmpty(),
    check("name", "Name is required").notEmpty(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorsArray = errors.array().map(err => new CustomError(
                400, 
                RequestErrorCodes.INVALID_INPUT, 
                err.msg,
                { field: err.param }
            ));
    
            return next(errorsArray);
        }
        next
    },
];