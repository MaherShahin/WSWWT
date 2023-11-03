import { Types } from "mongoose";
import Room, { IRoom, RoomType } from "../models/Room";
import { CustomError } from "../errors/CustomError";
import { validateRoom } from "../middleware/validation/roomValidation";
import { hashPassword } from "../utils/encryptionUtils";
import { UserService } from "./userService";
import { AuthorizationError } from "../errors/AuthorizationError";
import { NotFoundError } from "../errors/NotFoundError";
import { RequestErrorCodes } from "../constants/ErrorCodes";

export class RoomService {
  static async createRoom(params: {
    name: string;
    description: string;
    password?: string;
    roomAdmin: Types.ObjectId;
    roomType: RoomType;
    maxParticipants: number;
  }): Promise<IRoom> {
    const room: IRoom = new Room({ ...params, users: [params.roomAdmin] });
    validateRoom(room);
    if (room.password) {
      room.password = await hashPassword(room.password);
    }

    const savedRoom = await room.save();
    await UserService.addCreatedRoomToUser(params.roomAdmin, savedRoom._id);
    await UserService.addJoinedRoomToUser(params.roomAdmin, savedRoom._id);

    return savedRoom;
  }

  static async findRoomById(roomId: Types.ObjectId): Promise<IRoom | null> {
    return Room.findById(roomId)
      .populate("users", "name profilePicture")
      .exec();
  }

  static async updateRoom(
    userId: Types.ObjectId,
    roomId: Types.ObjectId,
    updates: Partial<IRoom>
  ): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);

    if (!room) throw new NotFoundError("Room not found");

    if (!room.roomAdmin.equals(userId))
      throw new AuthorizationError("Only room admin can update room");

    if (updates.password) {
      if (updates.password.length < 6 || updates.password.length > 50) {
        throw new CustomError(
          400,
          RequestErrorCodes.INVALID_INPUT,
          "Password must be between 6 and 50 characters",
          null
        );
      }
      updates.password = await hashPassword(updates.password);
    }

    Object.assign(room, updates);
    validateRoom(room);
    return room.save();
  }

  static async deleteRoom(
    userId: Types.ObjectId,
    roomId: Types.ObjectId
  ): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);
    if (!room) throw new NotFoundError("Room not found");
    if (!room.roomAdmin.equals(userId))
      throw new AuthorizationError("Only room admin can delete room");
    return Room.findByIdAndRemove(roomId).exec();
  }

  static async addUserToRoom(
    roomId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);
    if (!room) throw new NotFoundError("Room not found");
    room.addUser(userId);
    validateRoom(room);
    return room.save();
  }

  static async removeUserFromRoom(
    roomId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);
    if (!room) throw new NotFoundError("Room not found");
    room.removeUser(userId);
    validateRoom(room);
    return room.save();
  }

  static async addTitleToRoom(
    roomId: Types.ObjectId,
    title: any
  ): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);
    if (!room) throw new NotFoundError("Room not found");
    if (
      room.currentTitles.some((existingTitle) => existingTitle.id === title.id)
    ) {
      throw new CustomError(
        400,
        RequestErrorCodes.INVALID_INPUT,
        "Title already exists in room",
        null
      );
    }

    console.log("title in service", title);

    room.addTitle(title);

    console.log("room in service", room);

    validateRoom(room);
    return room.save();
  }

  static async removeTitleFromRoom(
    roomId: Types.ObjectId,
    title: any
  ): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);

    if (!room) throw new NotFoundError("Room not found");

    var titleExists = room.currentTitles.some(
      (existingTitleId) => existingTitleId.id === title.id
    );

    console.log("titleExists", titleExists);
    if (!titleExists) {
      throw new CustomError(
        400,
        RequestErrorCodes.INVALID_INPUT,
        "Title does not exist in room",
        null
      );
    }


    try {
      room.removeTitle(title.id);
    } catch (error) {
      throw new CustomError(
        400,
        RequestErrorCodes.INVALID_INPUT,
        "TiErreaom",
        null
      );
    }

    validateRoom(room);
    return room.save();
  }
}
