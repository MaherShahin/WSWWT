import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { AuthService } from "../services/authService";
import { asyncHandler } from "../utils/asyncHandler";
import { ValidationError } from "../errors/ValidationError";
import { UserService } from "../services/userService";
import Payload from "../types/Payload";
import config from "config";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../types/ApiResponse";

export class AuthController {
  
  static register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, name, password } = req.body;
      const token = await AuthService.registerUser(email, username, name, password);
      return new ApiResponse('User registered successfully', token);
    } catch (err) {
      next(err);
    }
  });

  static login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const response = await AuthService.loginUser(email, password);
      return new ApiResponse('User logged in successfully', response);
    } catch (err) {
      next(err);
    }
  });

  static getMe = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try{
      const token = req.header("x-auth-token");
      const payload: Payload | any = jwt.verify(token, config.get("jwtSecret"));
      const userId = payload.userId;
      const user = await UserService.findUserById(userId);
      if (!user) {
        throw new ValidationError("User not found");
      }
      return new ApiResponse('User retrieved successfully', user);
    } catch (err) {
      next(err);
    }
  });
}
