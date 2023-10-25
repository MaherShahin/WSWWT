import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { UserService } from "../services/userService";
import { handleApiResponse } from "../utils/apiUtils";
import { Types } from "mongoose";
import { NotFoundError } from "../errors/NotFoundError";
import { FriendService } from "../services/friendService";
import { ApiResponse } from "../types/ApiResponse";

export class FriendController {
  static getFriends = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const user = await UserService.findUserById(userId);

      const friendsList = user.getFriends();

      if (!user) {
        throw new NotFoundError();
      }

      return new ApiResponse("Friends retrieved successfully", user.friends);
    },
  );

  static removeFriend = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const friendId = new Types.ObjectId(req.params.friendId);
      const user = await FriendService.removeFriend(userId, friendId);

      if (!user) {
        throw new NotFoundError();
      }

      return new ApiResponse("Friend removed successfully", user);
    },
  );

  static getFriendRequests = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);

      if (!userId) {
        throw new NotFoundError();
      }

      const friendRequests = await FriendService.getFriendRequests(userId);

      var test = [{ message: "test" }];

      return new ApiResponse("Friend requests retrieved successfully", test);
    },
  );

  static sendFriendRequest = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const friendId = new Types.ObjectId(req.body.friendId);
      const friendRequest = await FriendService.sendFriendRequest(
        userId,
        friendId,
      );

      if (!friendRequest) {
        throw new NotFoundError();
      }

      return new ApiResponse("Friend request sent successfully", friendRequest);
    },
  );

  static acceptFriendRequest = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const friendId = new Types.ObjectId(req.body.friendId);

      if (!userId || !friendId) {
        throw new NotFoundError();
      }

      const user = await FriendService.addFriend(userId, friendId);

      return new ApiResponse("Friend request accepted successfully", user);
    },
  );

  static rejectFriendRequest = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const friendId = new Types.ObjectId(req.body.friendId);
      const user = await FriendService.removeFriend(userId, friendId);

      if (!user || !friendId) {
        throw new NotFoundError();
      }

      return new ApiResponse("Friend request rejected successfully", user);
    },
  );
}
