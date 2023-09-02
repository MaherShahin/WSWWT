import { Response, NextFunction } from 'express';
import Request from '../../types/Request';
import { IRoom } from '../../models/Room';
import { ValidationError } from '../../errors/validationError';

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

}