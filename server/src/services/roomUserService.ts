import { Types } from "mongoose";
import User from "../models/User";
import Room from "../models/Room";
import {
  validateRoomJoin,
  validateRoomLeave,
} from "../middleware/validation/roomValidation";
import { NotFoundError } from "../errors/NotFoundError";

export class RoomUserService {
  static async joinRoom(
    userId: Types.ObjectId,
    roomId: Types.ObjectId,
    password?: string,
  ) {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);

    if (!user || !room) {
      throw new NotFoundError("User or room not found");
    }

    validateRoomJoin(user, room, password);

    //TODO: refactor this later so it's one transaction!
    user.addJoinedRoom(roomId);
    await user.save();

    room.addUser(userId);
    await room.save();

    return { user, room };
  }

  static async leaveRoom(userId: Types.ObjectId, roomId: Types.ObjectId) {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);

    if (!user || !room) {
      throw new NotFoundError("User or room not found");
    }

    validateRoomLeave(user, room);

    user.removeJoinedRoom(roomId);
    await user.save();

    if (room.roomAdmin.equals(userId)) {
      await room.deleteOne();
    } else {
      room.removeUser(userId);
      await room.save();
    }

    return { user, room };
  }
}
