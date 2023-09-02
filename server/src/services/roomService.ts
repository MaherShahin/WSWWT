import { Types } from "mongoose";
import Room, { IRoom, RoomType } from "../models/Room";
import { ValidationError } from "../errors/validationError";
import { validateRoom } from "../middleware/validation/roomValidation";
import { hashPassword } from "../utils/encryptionUtils";
import User from "../models/User";
import { UserService } from "./userService";

export class RoomService {
  static async createRoom(params: {
    name: string,
    description: string,
    password?: string,
    roomAdmin: Types.ObjectId,
    roomType: RoomType,
    maxParticipants: number,
    criteria?: string[]
  }): Promise<IRoom> {
    const room = new Room({ ...params, users: [params.roomAdmin] });
    validateRoom(room);
    room.password = await hashPassword(room.password);

    const savedRoom = await room.save();

    await UserService.addCreatedRoomToUser(params.roomAdmin, savedRoom._id);
    await UserService.addJoinedRoomToUser(params.roomAdmin, savedRoom._id);

    return room;
  }

  static async findRoomById(roomId: Types.ObjectId): Promise<IRoom | null> {
    return Room.findById(roomId).exec();
  }

  static async updateRoom(userId: Types.ObjectId, roomId: Types.ObjectId, updates: Partial<IRoom>): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);

    if (!room) throw new ValidationError('Room not found');

    if (!room.roomAdmin.equals(userId)) throw new ValidationError('Only room admin can update room');

    if (updates.password) {
      if (updates.password.length < 6 || updates.password.length > 50) {
        throw new ValidationError('Password must be between 6 and 50 characters');
      }
      updates.password = await hashPassword(updates.password);
    }

    Object.assign(room, updates);
    validateRoom(room);
    return room.save();
  }

  static async deleteRoom(userId: Types.ObjectId, roomId: Types.ObjectId): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);
    if (!room) throw new ValidationError('Room not found');
    if (!room.roomAdmin.equals(userId)) throw new ValidationError('Only room admin can delete room');
    return Room.findByIdAndRemove(roomId).exec();
  }

  static async addUserToRoom(roomId: Types.ObjectId, userId: Types.ObjectId): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);
    if (!room) throw new ValidationError('Room not found');
    room.addUser(userId);
    validateRoom(room);
    return room.save();
  }

  static async removeUserFromRoom(roomId: Types.ObjectId, userId: Types.ObjectId): Promise<IRoom | null> {
    const room = await this.findRoomById(roomId);
    if (!room) throw new ValidationError('Room not found');
    room.removeUser(userId);
    validateRoom(room);
    return room.save();
  }

}
