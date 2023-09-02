import { Response } from 'express';
import Request from '../types/Request';
import { Types } from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler';
import { RoomService } from '../services/roomService';
import { RoomType } from '../models/Room';
import { RoomUserService } from '../services/roomUserService';
import { hashPassword } from '../utils/encryptionUtils';

interface RoomDto {
    name: string,
    description: string,
    password?: string,
    roomType: RoomType,
    maxParticipants: number,
    criteria?: string[]
}

export class RoomController {

    static createRoom = asyncHandler(async (req: Request, res: Response) => {
        const roomData: RoomDto = req.body;
        const roomAdmin = req.userId as unknown as Types.ObjectId;

        const newRoom = await RoomService.createRoom({ ...roomData, roomAdmin });

        if (!newRoom) {
            return res.status(400).json({ message: 'Room could not be created' });
        }

        return res.status(201).json(newRoom);
    });

    static getRoomById = asyncHandler(async (req: Request, res: Response) => {
        const roomId = new Types.ObjectId(req.params.id);

        if (!roomId) {
            return res.status(400).json({ message: 'You need to input a roomId' });
        }

        const room = await RoomService.findRoomById(roomId);

        if (room) {
            room.password = undefined;
            res.status(200).json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    });

    static joinRoom =  asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId as unknown as Types.ObjectId;
        const roomId = new Types.ObjectId(req.params.roomId);

        const { roomPassword } = req.body;

        const result = await RoomUserService.joinRoom(userId, roomId, roomPassword);

        if (!result) {
            return res.status(400).json({ message: 'Could not join room' });
        }

        return res.status(200).json(result);
    });

    static leaveRoom = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId as unknown as Types.ObjectId;
        const roomId = new Types.ObjectId(req.params.roomId);

        const result = await RoomUserService.leaveRoom(userId, roomId);

        if (!result) {
            return res.status(400).json({ message: 'Could not leave room' });
        }

        return res.status(200).json(result);
    });

    static deleteRoom = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId as unknown as Types.ObjectId;
        const roomId = new Types.ObjectId(req.params.roomId);

        const result = await RoomService.deleteRoom(userId, roomId);

        if (!result) {
            return res.status(400).json({ message: 'Could not delete room' });
        }

        return res.status(200).json({ message: 'Room deleted'});
    });

    static updateRoom = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId as unknown as Types.ObjectId;
        const roomId = new Types.ObjectId(req.params.roomId);
        const updates = req.body;

        const room = await RoomService.findRoomById(roomId);

        const result = await RoomService.updateRoom(userId, roomId, updates);

        if (!result) {
            return res.status(400).json({ message: 'Could not update room' });
        }

        return res.status(200).json(result);
    });


    // static addSeriesToRoom = asyncHandler(async (req: Request, res: Response) => {
    //     const roomId = new Types.ObjectId(req.params.roomId);
    //     const seriesId = new Types.ObjectId(req.body.seriesId);

    //     const updatedRoom = await RoomService.addSeriesToRoom(roomId, seriesId);
    //     if (updatedRoom) {
    //         res.status(200).json(updatedRoom);
    //     } else {
    //         res.status(404).json({ message: 'Room or Series not found' });
    //     }
    // });

    // static removeSeriesFromRoom = asyncHandler(async (req: Request, res: Response) => {
    //     const roomId = new Types.ObjectId(req.params.roomId);
    //     const seriesId = new Types.ObjectId(req.body.seriesId);
    //     const updatedRoom = await RoomService.removeSeriesFromRoom(roomId, seriesId);
    //     if (updatedRoom) {
    //         res.status(200).json(updatedRoom);
    //     } else {
    //         res.status(404).json({ message: 'Room or Series not found' });
    //     }
    // });

}
