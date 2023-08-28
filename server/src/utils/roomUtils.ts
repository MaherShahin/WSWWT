import { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import Room, { IRoom } from "../models/Room";
import Request from "../types/Request";
import { validateRoomProperties } from "../middleware/validation/roomValidation";
import HttpStatusCodes from "http-status-codes";
import { ValidationError } from "../middleware/validation/ValidationError";

export async function createRoom(req: Request, user: IUser) {
    try {
        const { name, password, roomType, description, criteria, maxParticipants } = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
    
        const room = new Room({
            name,
            password: passwordHash,
            roomType,
            description,
            criteria,
            maxParticipants,
            users: [user._id],
            roomAdmin: user._id,
        });
    
        validateRoomProperties(room);
        await room.save();
        return room;
    } catch (err) {
        throw new ValidationError(err.message, HttpStatusCodes.BAD_REQUEST);
    }
}

export async function updateRoom(req: Request, room: IRoom) {
    try {
        const { name, description, criteria, maxParticipants, password, roomType } = req.body;
        if (name) {
            room.name = name;
        }
    
        if (description) {
            room.description = description;
        }
    
        if (criteria) {
            room.criteria = criteria;
        }
    
        if (maxParticipants) {
            room.maxParticipants = maxParticipants;
        }
    
        if (roomType) {
            room.roomType = roomType;
        }
    
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            room.password = passwordHash;
        }

        validateRoomProperties(room);
        await room.save();
        return room;
    } catch (err) {
        throw new ValidationError(err.message, HttpStatusCodes.BAD_REQUEST);
    }
}

export async function addUserToRoom(room: IRoom, user: IUser, req: Request) {
    try {
        
        if (room.users.includes(user._id)) {
            throw new ValidationError("User already in room", HttpStatusCodes.BAD_REQUEST);
        }
    
        if (room.roomType === "private") {
            let { roomPassword } = req.body;
            const isMatch = await bcrypt.compare(roomPassword, room.password);
    
            if (!isMatch) {
                throw new ValidationError("Invalid room password", HttpStatusCodes.BAD_REQUEST);
            }
        }
    
        room.users.push(user._id);
        validateRoomProperties(room);
        await room.save();
    } catch (err) {
        throw new ValidationError(err.message, HttpStatusCodes.BAD_REQUEST);
    }
}
