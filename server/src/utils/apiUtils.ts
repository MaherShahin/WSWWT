import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/ApiResponse";

//TODO: Remove export once it is completely replaced
// handles
//deprecated
export const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

// Unified wrapper function to handle both async operations and API response
export const handleApiResponse = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      if (result instanceof ApiResponse) {
        result.send(res);
      } else {
        new ApiResponse("Operation successful", result).send(res);
      }
    } catch (error) {
      next(error);
    }
  };
};
