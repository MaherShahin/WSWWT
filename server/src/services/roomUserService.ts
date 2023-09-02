import { Types } from 'mongoose';
import User from '../models/User';
import Room from '../models/Room';
import { validateRoomJoin, validateRoomLeave } from '../middleware/validation/roomValidation';

export class RoomUserService {
  static async joinRoom(userId: Types.ObjectId, roomId: Types.ObjectId, password?: string) {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    
    validateRoomJoin(user, room, password);

    user.addJoinedRoom(roomId);
    await user.save();

    room.addUser(userId);
    await room.save();
    
    return { user, room };
  }

  static async leaveRoom(userId: Types.ObjectId, roomId: Types.ObjectId) {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);

    validateRoomLeave(user, room);

    user.removeJoinedRoom(roomId);
    await user.save();

    room.removeUser(userId);
    await room.save();

    return { user, room };
  }    
  
}

