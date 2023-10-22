import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { UserService } from "../services/userService";
import { asyncHandler } from "../utils/asyncHandler";
import { Types } from "mongoose";
import { NotFoundError } from '../errors/NotFoundError';
import { ApiResponse } from "../types/ApiResponse";

export class UserController {

  static update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bio, name } = req.body;
      const userId = new Types.ObjectId(req.userId);
      const user = await UserService.updateUser(userId, bio, name);

      if (!user) {
        throw new NotFoundError();
      }

      const response = new ApiResponse('User updated', user.toObject());
      response.send(res);
    } catch (error) {
      next(error);
    }
  });

  static delete = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new Types.ObjectId(req.userId);
      await UserService.deleteUser(userId);

      const response = new ApiResponse('User deleted', null);
      response.send(res);
    } catch (error) {
      next(error);
    }
  });

  static getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new Types.ObjectId(req.userId);
      const user = await UserService.findUserById(userId);

      console.log(userId);

      if (!user) {
        throw new NotFoundError();
      }

      const response = new ApiResponse('User found', user.toObject());
      response.send(res);
    } catch (error) {
      next(error);
    }
  });

  static getUserRooms = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new Types.ObjectId(req.userId);
      const user = await UserService.findUserById(userId);

      if (!user) {
        throw new NotFoundError();
      }

      const rooms = await UserService.getUserRooms(userId);
      const response = new ApiResponse('User rooms found', rooms);
      response.send(res);
    } catch (error) {
      next(error);
    }
  });

  static searchUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new Types.ObjectId(req.userId);
      const query = String(req.query.q).trim();

      let users = [];

      if (Types.ObjectId.isValid(query)) {
        const searchUserId = new Types.ObjectId(query);
        const userById = await UserService.findUserById(searchUserId);
        if (userById && userById._id.toString() !== userId.toString()) {
          users.push(userById);
        }
      }

      const usersByName = await UserService.findUsersByName(query);
      const filteredUsers = usersByName.filter(u =>
        u._id.toString() !== userId.toString()
      );

      const allUsers = [...users, ...filteredUsers];
      const response = new ApiResponse('Users found', allUsers);
      response.send(res);
    } catch (error) {
      next(error);
    }
  });

}
