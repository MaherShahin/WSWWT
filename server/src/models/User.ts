import { Document, model, Schema, Types } from "mongoose";
import Room from "./Room";

/**
 * Type to model the User Schema for TypeScript.
 * @param username:string
 * @param name:string
 * @param email:string
 * @param password:string
 * @param createdRooms:[string]
 * @param joinedRooms:[string]
 * @param profilePicture:string
 * @param bio:string
 * @param dateCreated:Date
 * @param lastLogin:Date
 */

export type TUser = {
  username: string;
  name: string;
  email: string;
  password: string;
  createdRooms: Types.ObjectId[];
  joinedRooms: Types.ObjectId[];
  profilePicture: string;
  bio: string;
  dateCreated: Date;
  lastLogin: Date;

  //Methods
  addJoinedRoom(roomId: Types.ObjectId): void;
  removeJoinedRoom(roomId: Types.ObjectId): void;
  addCreatedRoom(roomId: Types.ObjectId): void;
};

/**
 * Mongoose Document based on TUser for TypeScript.
 * https://mongoosejs.com/docs/documents.html
 *
 * TUser
 * @param username:string
 * @param name:string
 * @param email:string
 * @param password:string
 * @param createdRooms:string[]
 * @param joinedRooms:string[]
 * @param profilePicture:string
 * @param bio:string
 * @param dateCreated:Date
 * @param lastLogin:Date
 */

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdRooms: {
    type: [Types.ObjectId],
    ref: 'Room', 
    default: [],
  },
  joinedRooms: {
    type: [Types.ObjectId],
    ref: 'Room', 
    default: [],
  },
  profilePicture: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

/**
 * Mongoose Model based on TUser for TypeScript.
 * https://mongoosejs.com/docs/models.html
 *
 * TUser
 * @param username:string
 * @param name:string
 * @param email:string
 * @param password:string
 * @param createdRooms:string[]
 * @param joinedRooms:string[]
 * @param profilePicture:string
 * @param bio:string
 * @param dateCreated:Date
 * @param lastLogin:Date
 */

userSchema.pre<IUser>("remove", async function (next) {
  const user = this;
  // Remove user from all rooms they have joined

  await Room.updateMany(
    { _id: { $in: user.joinedRooms } },
    { $pull: { users: user._id } }
  );

  // Delete all rooms created by the user
  const roomsToDelete = await Room.find({ _id: { $in: user.createdRooms } });
  for (const room of roomsToDelete) {
    await room.remove();
  }

  next();
});

userSchema.methods.addJoinedRoom = function(roomId: Types.ObjectId) {
  this.joinedRooms.push(roomId);
};

userSchema.methods.removeJoinedRoom = function(roomId: Types.ObjectId) {
  this.joinedRooms = this.joinedRooms.filter((id: Types.ObjectId) => !id.equals(roomId));
};

userSchema.methods.addCreatedRoom = function(roomId: Types.ObjectId) {
  this.createdRooms.push(roomId);
}

const User = model<IUser>("User", userSchema);

export default User;
