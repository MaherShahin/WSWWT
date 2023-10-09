import { Response, NextFunction } from 'express';
import Request from '../types/Request';
import { Types } from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler';
import { RoomService } from '../services/roomService';
import { RoomType } from '../models/Room';
import { RoomUserService } from '../services/roomUserService';
import { ValidationError } from '../errors/validationError';
import { NotFoundError } from '../errors/notFoundError';

interface RoomDto {
    name: string,
    description: string,
    password?: string,
    roomType: RoomType,
    maxParticipants: number,
}

export class RoomController {

    static createRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log('createRoom');
        try {
            const roomAdmin = new Types.ObjectId(req.userId);
            const roomData: RoomDto = req.body;
            console.log('roomData', roomData);
            const newRoom = await RoomService.createRoom({ ...roomData, roomAdmin });
    
            if (!newRoom) {
                throw new ValidationError([{ message: 'Room could not be created' }]);
            }
    
            return res.status(200).json(newRoom);
        } catch (err) {
            console.log(err);
            next(err);
        }

    });

    static getRoomById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const roomId = new Types.ObjectId(req.params.id);

        if (!roomId) {
            throw new ValidationError([{ message: 'You need to input a roomId' }]);
        }

        const room = await RoomService.findRoomById(roomId);

        if (!room) {
            throw new NotFoundError('Room not found');
        }

        room.password = undefined;
        res.status(200).json(room);
    });

    static joinRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userId = new Types.ObjectId(req.userId);
        const roomId = new Types.ObjectId(req.params.roomId);
        const { password } = req.body;

        const result = await RoomUserService.joinRoom(userId, roomId, password);

        if (!result) { 
            throw new ValidationError([{ message: 'Could not join room' }]);
        }

        return res.status(200).json(result);
    });

    static leaveRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userId = new Types.ObjectId(req.userId);
        const roomId = new Types.ObjectId(req.params.roomId);

        const result = await RoomUserService.leaveRoom(userId, roomId);

        if (!result) {
            throw new ValidationError([{ message: 'Could not leave room' }]);
        }

        return res.status(200).json(result);
    });

    static deleteRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userId = new Types.ObjectId(req.userId);
        const roomId = new Types.ObjectId(req.params.roomId);

        const result = await RoomService.deleteRoom(userId, roomId);

        if (!result) {
            throw new ValidationError([{ message: 'Could not delete room' }]);
        }

        return res.status(200).json({ message: 'Room deleted' });
    });

    static updateRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userId = new Types.ObjectId(req.userId);
        const roomId = new Types.ObjectId(req.params.roomId);
        const updates = req.body;

        const room = await RoomService.findRoomById(roomId);

        const result = await RoomService.updateRoom(userId, roomId, updates);

        if (!result) {
            throw new ValidationError([{ message: 'Could not update room' }]);
        }

        return res.status(200).json(result);
    });

}
