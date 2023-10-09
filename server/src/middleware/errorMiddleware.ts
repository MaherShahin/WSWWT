import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        console.log(err);
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }

    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
}
