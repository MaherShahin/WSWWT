import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from "http-status-codes";
import { IRoom } from '../../models/Room';
import { TRoom } from "../../models/Room";
import { ValidationError } from '../../errors/validationError';

export const validateRoomId = (req: Request, res: Response, next: NextFunction) => {
    const roomId: string = String(req.params.roomId);

    if (!roomId) {
        throw new ValidationError('Room id is required', HttpStatusCodes.BAD_REQUEST);
    }

    if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ValidationError('Invalid room id', HttpStatusCodes.BAD_REQUEST);
    }

    next();
};

export const  validateRoomProperties = (room: TRoom) => {

    if (room.roomType === 'private' && !room.password) {
        throw new ValidationError('Password is required for private rooms', HttpStatusCodes.BAD_REQUEST);
    }

    if (room.roomType !== 'private' && room.roomType !== 'public') {
        throw new ValidationError('Invalid room type', HttpStatusCodes.BAD_REQUEST);
    }

    if (room.users.length > room.maxParticipants) {
        throw new ValidationError('You cannot have more users than max participants', HttpStatusCodes.BAD_REQUEST);
    }

    if (room.maxParticipants < 1 || room.maxParticipants > 25) {
        throw new ValidationError('Invalid max participants, you must have at least 1 and at most 25 participants', HttpStatusCodes.BAD_REQUEST);
    }

};