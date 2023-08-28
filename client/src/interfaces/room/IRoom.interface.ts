export interface IRoom {
    _id?: string;
    name: string;
    description?: string;  // A short description about what the room is about
    users: string[];
    currentSeries?: string[];
    passwordHash: string;
    roomAdmin: string;  // The user who created or administers the room
    roomType: 'public' | 'private';  // If it's a public room, anyone can join. If private, they'll need the password.
    maxParticipants?: number;  // Maximum number of participants in a room
    criteria?: string[];  // List of criteria or topics of the room (e.g., ["Horror", "Comedy", "Action"])
}
