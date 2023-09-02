// RoomUserService.ts

import { Types } from 'mongoose';
import User from '../models/User';
import Room from '../models/Room';
import { ValidationError } from '../errors/validationError';
import { comparePasswords } from '../utils/encryptionUtils';

export class RoomUserService {
  static async joinRoom(userId: Types.ObjectId, roomId: Types.ObjectId, password?: string) {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    
    if (!user || !room) {
      throw new ValidationError('User or room not found');
    }

    if (room.users.includes(userId)) {
      throw new ValidationError('User already in room');
    }

    if (room.maxParticipants && room.users.length >= room.maxParticipants) {
        throw new ValidationError('Room is full');
    }

    if (room.roomType === 'private' && !password) {
        throw new ValidationError('Room is private, you need to provide a password');
    }

    if (!comparePasswords(password, room.password)) {
        throw new ValidationError('Incorrect password');
    }
    
    user.addJoinedRoom(roomId);
    user.save();

    room.addUser(userId);
    await room.save();
    
    return { user, room };
  }

  static async leaveRoom(userId: Types.ObjectId, roomId: Types.ObjectId) {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    
    if (!user || !room) {
      throw new ValidationError('User or room not found');
    }

    if (!room.users.includes(userId)) {
      throw new ValidationError('User is not in room');
    }

    if (room.roomAdmin.equals(userId)) {
      throw new ValidationError('Room admin cannot leave room');
    }

    user.removeJoinedRoom(roomId);
    await user.save();

    room.removeUser(userId);
    await room.save();

    return { user, room };
  }    
  
}

