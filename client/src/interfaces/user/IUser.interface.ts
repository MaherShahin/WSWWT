import { IRoom } from '../room/IRoom.interface';

export interface IUser {
    _id?: string;
    username: string;
    name: string;
    email: string;
    passwordHash: string;  
    rooms: string[];
    joinedRooms: string[]; 
    profilePicture?: string;
    bio?: string; 
    dateCreated: Date;
    lastLogin?: Date; 
}
