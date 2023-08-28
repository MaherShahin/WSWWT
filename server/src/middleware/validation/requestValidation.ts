import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from "http-status-codes";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  };