import { Response, NextFunction } from 'express';
import Request from '../types/Request';
import { Types } from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler';
import { RoomService } from '../services/roomService';
import { RoomType } from '../models/Room';
import { RoomUserService } from '../services/roomUserService';
import { ValidationError } from '../errors/ValidationError';
import { NotFoundError } from '../errors/NotFoundError';
import { ApiResponse } from '../types/ApiResponse';

interface RoomDto {
    name: string,
    description: string,
    password?: string,
    roomType: RoomType,
    maxParticipants: number,
}

export class RoomController {

    static createRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roomAdmin = new Types.ObjectId(req.userId);
            const roomData: RoomDto = req.body;
            console.log('roomData', roomData);
            const newRoom = await RoomService.createRoom({ ...roomData, roomAdmin });
    
            if (!newRoom) {
                throw new ValidationError('Room could not be created');
            }
    
            return res.status(200).json(newRoom);
        } catch (err) {
            console.log(err);
            next(err);
        }

    });

    static getRoomById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roomId = new Types.ObjectId(req.params.id);

            if (!roomId) {
                throw new ValidationError('You need to input a roomId');
            }
    
            const room = await RoomService.findRoomById(roomId);
    
            if (!room) {
                throw new NotFoundError('Room not found');
            }
    
            room.password = undefined;
            res.status(200).json(room);
        } catch (err) {
            next(err);
        }
    });

    static joinRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = new Types.ObjectId(req.userId);
            const roomId = new Types.ObjectId(req.params.roomId);
            const { password } = req.body;
    
            const result = await RoomUserService.joinRoom(userId, roomId, password);
    
            if (!result) { 
                throw new ValidationError('Could not join room');
            }
    
            return new ApiResponse('Joined room', result);
        } catch (err) {
            next(err);
        }
    });

    static leaveRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = new Types.ObjectId(req.userId);
            const roomId = new Types.ObjectId(req.params.roomId);
    
            const result = await RoomUserService.leaveRoom(userId, roomId);
    
            if (!result) {
                throw new ValidationError('Could not leave room');
            }
    
            return new ApiResponse('Left room successfully' , result);
        } catch (err) {
            next(err);
        }
    });

    static deleteRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = new Types.ObjectId(req.userId);
            const roomId = new Types.ObjectId(req.params.roomId);
    
            const result = await RoomService.deleteRoom(userId, roomId);
    
            if (!result) {
                throw new ValidationError('Could not delete room');
            }
    
            return new ApiResponse('Room deleted successfully!', result);
        } catch (err) {
            next(err);
        }
    });

    static updateRoom = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = new Types.ObjectId(req.userId);
            const roomId = new Types.ObjectId(req.params.roomId);
            const updates = req.body;
    
            const room = await RoomService.findRoomById(roomId);
    
            const result = await RoomService.updateRoom(userId, roomId, updates);
    
            if (!result) {
                throw new ValidationError('Could not update room');
            }
    
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    });

}
