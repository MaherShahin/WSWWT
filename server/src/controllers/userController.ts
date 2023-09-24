import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { UserService } from "../services/userService";
import { asyncHandler } from "../utils/asyncHandler";
import { Types } from "mongoose";
import { NotFoundError } from '../errors/notFoundError';

export class UserController {

  static update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { bio, name } = req.body;
    const userId = new Types.ObjectId(req.userId);
    const user = await UserService.updateUser(userId, bio, name);
    
    if (!user) {
      throw new NotFoundError();
    }

    res.status(200).json({ user: user.toObject() });
  });

  static delete = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = new Types.ObjectId(req.userId);
    await UserService.deleteUser(userId);
    res.status(200).send("User deleted");
  });

  static getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = new Types.ObjectId(req.params.id);
    const user = await UserService.findUserById(userId);
    
    if (!user) {
      throw new NotFoundError();
    }

    res.status(200).json({ user: user.toObject() });
  });

  static getUserRooms = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = new Types.ObjectId(req.userId);
    const user = await UserService.findUserById(userId);
    
    if (!user) {
      throw new NotFoundError();
    }
    
    const rooms = await UserService.getUserRooms(userId);
    res.status(200).json({'rooms': rooms});
  });

}
