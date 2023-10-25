import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { UserService } from "../services/userService";
import { handleApiResponse } from "../utils/apiUtils";
import { Types } from "mongoose";
import { NotFoundError } from "../errors/NotFoundError";
import { ApiResponse } from "../types/ApiResponse";

export class UserController {
  static update = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const { bio, name } = req.body;
      const userId = new Types.ObjectId(req.userId);
      const user = await UserService.updateUser(userId, bio, name);

      if (!user) {
        throw new NotFoundError();
      }

      return new ApiResponse("User updated", user.toObject());
    },
  );

  static delete = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      await UserService.deleteUser(userId);

      return new ApiResponse("User deleted", null);
    },
  );

  static getUserById = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const user = await UserService.findUserById(userId);

      console.log(userId);

      if (!user) {
        throw new NotFoundError();
      }

      return new ApiResponse("User found", user.toObject());
    },
  );

  static getUserRooms = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const user = await UserService.findUserById(userId);

      if (!user) {
        throw new NotFoundError();
      }

      const rooms = await UserService.getUserRooms(userId);
      return new ApiResponse("User rooms found", rooms);
    },
  );

  static searchUsers = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
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
      const filteredUsers = usersByName.filter(
        (u) => u._id.toString() !== userId.toString(),
      );

      const allUsers = [...users, ...filteredUsers];
      return new ApiResponse("Users found", allUsers);
    },
  );
}
