// src/controllers/AuthController.ts
import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { AuthService } from "../services/authService";
import { asyncHandler } from "../utils/asyncHandler";
import { ValidationError } from "../errors/validationError";
import { UserService } from "../services/userService";
import Payload from "../types/Payload";
import config from "config";
import jwt from "jsonwebtoken";

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, name, password } = req.body;
    const token = await AuthService.registerUser(email, username, name, password);
    res.status(200).json({ token });
  });

  static login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const response = await AuthService.loginUser(email, password);
    res.status(200).json(response);
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
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  });
}
