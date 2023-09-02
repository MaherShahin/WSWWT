import { Response, NextFunction } from 'express';
import Request from '../../types/Request';
import Room, { IRoom } from '../../models/Room';
import { ValidationError } from '../../errors/validationError';
import { comparePasswords } from '../../utils/encryptionUtils';
import { Types } from 'mongoose';
import User, { IUser } from '../../models/User';

export const validateCreateRoom = (req: Request, res: Response, next: NextFunction) => {
  const roomData = req.body as any;

  if (!roomData || !roomData.name || !roomData.roomType || !roomData.maxParticipants) {
    throw new ValidationError('Invalid room data');
  }

  if (roomData.roomType === 'private' && !roomData.password) {
    throw new ValidationError('Password must be provided for a private room.');
  }

  if (roomData.roomType !== 'private' && roomData.roomType !== 'public') {
    throw new ValidationError('Invalid room type.');
  }

  if (roomData.maxParticipants < 1 || roomData.maxParticipants > 25) {
    throw new ValidationError('Max participants must be greater than 0 and less than 25.');
  }

  next();
};

export const validateRoom = (room: IRoom): void => {
  if (!room.name || room.name.length < 3 || room.name.length > 50) {
    throw new ValidationError('Room name must be between 3 and 50 characters.');
  }

  if (!room.description || room.description.length === 0) {
    throw new ValidationError('Description must not be empty.');
  }

  if (room.roomType === 'private' && !room.password) {
    throw new ValidationError('Password must be provided for a private room.');
  }

  if (!room.roomAdmin) {
    throw new ValidationError('Invalid room admin.');
  }

  if (room.maxParticipants <= 0 || room.maxParticipants > 25) {
    throw new ValidationError('Max participants must be greater than 0 and less than 25.');
  }

  if (room.users.length > room.maxParticipants) {
    throw new ValidationError('Max participants must be greater than number of users in room.');
  }

  if (room.users.length === 0) {
    throw new ValidationError('Room must have at least one user.');
  }

  if (room.roomType !== 'private' && room.roomType !== 'public') {
    throw new ValidationError('Invalid room type.');
  }

  if (room.roomType === 'public' && room.password) {
    throw new ValidationError('Password can only be set for private rooms.');
  }

};

export const validateRoomJoin = (user: IUser, room: IRoom, password?: string) => {

  if (!user || !room) {
    throw new ValidationError('User or room not found');
  }

  if (room.users.includes(user._id)) {
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

  return { user, room };
};

export const validateRoomLeave = (user: IUser, room: IRoom) => {
  if (!user || !room) {
    throw new ValidationError('User or room not found');
  }

  if (!room.users.includes(user._id)) {
    throw new ValidationError('User is not in room');
  }

  if (room.roomAdmin.equals(user._id)) {
    throw new ValidationError('Room admin cannot leave room');
  }
};
