import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler';
import {RoomService} from '../services/roomService';

export class RoomController {
  
  static createRoom = asyncHandler(async (req: Request, res: Response) => {
    const roomData = req.body;
    const newRoom = await RoomService.createRoom(roomData);
    if (!newRoom) {
      res.status(400).json({ message: 'Room could not be created' });
    }
    
    res.status(201).json(newRoom);
  });

  static getRoomById = asyncHandler(async (req: Request, res: Response) => {
    const roomId = new Types.ObjectId(req.params.id);
    const room = await RoomService.findRoomById(roomId);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  });

  static addSeriesToRoom = asyncHandler(async (req: Request, res: Response) => {
    const roomId = new Types.ObjectId(req.params.roomId);
    const seriesId = new Types.ObjectId(req.body.seriesId);

    const updatedRoom = await RoomService.addSeriesToRoom(roomId, seriesId);
    if (updatedRoom) {
      res.status(200).json(updatedRoom);
    } else {
      res.status(404).json({ message: 'Room or Series not found' });
    }
  });

  static removeSeriesFromRoom = asyncHandler(async (req: Request, res: Response) => {
    const roomId = new Types.ObjectId(req.params.roomId);
    const seriesId = new Types.ObjectId(req.body.seriesId);
    const updatedRoom = await RoomService.removeSeriesFromRoom(roomId, seriesId);
    if (updatedRoom) {
      res.status(200).json(updatedRoom);
    } else {
      res.status(404).json({ message: 'Room or Series not found' });
    }
  });
  
}
