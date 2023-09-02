// src/controllers/AuthController.ts
import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { AuthService } from "../services/authService";
import { asyncHandler } from "../utils/asyncHandler";

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, name, password } = req.body;
    const token = await AuthService.registerUser(email, username, name, password);
    res.json({ token });
  });

  static login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const token = await AuthService.loginUser(email, password);
    res.json({ token });
  });
}
