import { Response, NextFunction } from "express";
import Request from "../types/Request";
import { Types } from "mongoose";
import { handleApiResponse } from "../utils/apiUtils";
import { RoomService } from "../services/roomService";
import { RoomType } from "../models/Room";
import { RoomUserService } from "../services/roomUserService";
import { ValidationError } from "../errors/ValidationError";
import { NotFoundError } from "../errors/NotFoundError";
import { ApiResponse } from "../types/ApiResponse";
import { TitleService } from "../services/titleService";

interface RoomDto {
  name: string;
  description: string;
  password?: string;
  roomType: RoomType;
  maxParticipants: number;
}

export class RoomController {
  static createRoom = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const roomAdmin = new Types.ObjectId(req.userId);
      const roomData: RoomDto = req.body;

      const newRoom = await RoomService.createRoom({ ...roomData, roomAdmin });

      if (!newRoom) {
        throw new ValidationError("Room could not be created");
      }

      return new ApiResponse("Room created successfully", newRoom);
    },
  );

  static getRoomById = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const roomId = new Types.ObjectId(req.params.id);

      if (!roomId) {
        throw new ValidationError("You need to input a roomId");
      }

      const room = await RoomService.findRoomById(roomId);

      if (!room) {
        throw new NotFoundError("Room not found");
      }

      room.password = undefined;
      return new ApiResponse("Room retrieved successfully", room);
    },
  );

  static joinRoom = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const roomId = new Types.ObjectId(req.params.roomId);
      const { password } = req.body;

      const result = await RoomUserService.joinRoom(userId, roomId, password);

      if (!result) {
        throw new ValidationError("Could not join room");
      }
      console.log("result", result);
      return new ApiResponse("Joined room", result);
    },
  );

  static leaveRoom = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const roomId = new Types.ObjectId(req.params.roomId);

      const result = await RoomUserService.leaveRoom(userId, roomId);

      if (!result) {
        throw new ValidationError("Could not leave room");
      }
      return new ApiResponse("Left room successfully", result);
    },
  );

  static deleteRoom = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const roomId = new Types.ObjectId(req.params.roomId);

      const result = await RoomService.deleteRoom(userId, roomId);

      if (!result) {
        throw new ValidationError("Could not delete room");
      }

      return new ApiResponse("Room deleted successfully!", result);
    },
  );

  static updateRoom = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = new Types.ObjectId(req.userId);
      const roomId = new Types.ObjectId(req.params.roomId);
      const updates = req.body;

      const result = await RoomService.updateRoom(userId, roomId, updates);

      if (!result) {
        throw new ValidationError("Could not update room");
      }

      return new ApiResponse("Room updated successfully", result);
    },
  );

  static addTitle = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {

      console.log("addTitle", req.params);

      const roomId = new Types.ObjectId(req.params.roomId);
      const title = req.body.title;

      console.log("roomId", roomId);
      console.log("title", title);

      const result = await RoomService.addTitleToRoom(roomId, title);

      console.log("result", result);
      if (!result) {
        throw new ValidationError("Could not add title");
      }

      console.log("result", result);

      return new ApiResponse("Title added successfully", result);
    },
  );
  
  static removeTitle = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const roomId = new Types.ObjectId(req.params.roomId);
      const title = req.body.title;

      const result = await RoomService.removeTitleFromRoom(roomId, title);

      if (!result) {
        throw new ValidationError("Could not remove title");
      }

      return new ApiResponse("Title removed successfully", result);
    },
  );
}
