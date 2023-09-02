// src/controllers/userController.ts
import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { UserService } from "../services/userService";
import { asyncHandler } from "../utils/asyncHandler";
import { registerValidation } from "../middleware/validation/registerValidation";

export class UserController {

  static update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { bio, name } = req.body;
    const user = await UserService.updateUser(req.userId, bio, name);
    res.status(200).json({ user: user.toObject() });
  });

  static delete = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await UserService.deleteUser(req.userId);
    res.status(200).send("User deleted");
  });
}
