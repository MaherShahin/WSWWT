import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { UserService } from "../services/userService";
import { asyncHandler } from "../utils/asyncHandler";
import { Types } from "mongoose";
import { NotFoundError } from '../errors/NotFoundError';
import { FriendService } from "../services/friendService";

export class FriendController {

  static getFriends = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {    
      const userId = new Types.ObjectId(req.userId);
      const user = await UserService.findUserById(userId);
      
      if (!user) {
        throw new NotFoundError();
      }
      
      res.status(200).json({'friends': []});
    } catch (error) {
      next(error);
    }
  });

  static removeFriend = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new Types.ObjectId(req.userId);
      const friendId = new Types.ObjectId(req.params.friendId);
      const user = await FriendService.removeFriend(userId, friendId);
      
      if (!user) {
        throw new NotFoundError();
      }
  
      res.status(200).json({ user: user.toObject() });  
    } catch (error) {
      next(error);
    }

  });

  static getFriendRequests = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new Types.ObjectId(req.userId);

      if (!userId) {
        throw new NotFoundError();
      }
  
      const friendRequests = await FriendService.getFriendRequests(userId);
  
      res.status(200).json({ friendRequests: friendRequests });
    } catch (error) {
      next(error);
    }

  });

  static sendFriendRequest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = new Types.ObjectId(req.userId);
        const friendId = new Types.ObjectId(req.body.friendId);
        const friendRequest = await FriendService.sendFriendRequest(userId, friendId);
        
        if (!friendRequest) {
          throw new NotFoundError();
        }
    
        res.status(200).json({ friendRequest: friendRequest });
      } catch (error) {
        next(error);
      }
  });

  static acceptFriendRequest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userId = new Types.ObjectId(req.userId);
      const friendId = new Types.ObjectId(req.body.friendId);
  
      if (!userId || !friendId) {
        throw new NotFoundError();
      }
  
      const user = await FriendService.addFriend(userId, friendId);
  
      res.status(200).json({ user: user.toObject() });
    } catch (error) {
      next(error);
    }


  });  

  static rejectFriendRequest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new Types.ObjectId(req.userId);
      const friendId = new Types.ObjectId(req.body.friendId);
      const user = await FriendService.removeFriend(userId, friendId);
      
      if (!user || !friendId) {
        throw new NotFoundError();
      }
  
      res.status(200).json({ user: user.toObject() });
    } catch (error) {
      next(error);
    }

  });

}
