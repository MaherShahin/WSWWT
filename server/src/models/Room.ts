import { Document, model, Schema, Types } from "mongoose";
import User from "./User";

export enum RoomType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export type TRoom = {
  name: string;
  description: string;
  users: Types.ObjectId[];
  currentTitles: any[]; 
  password?: string;
  roomAdmin: Types.ObjectId;
  roomType: RoomType;
  maxParticipants: number;

  // Methods
  addUser(userId: Types.ObjectId): void;
  removeUser(userId: Types.ObjectId): void;
  addTitle(title: any): void;
  removeTitle(titleId: number): void; 
};

export interface IRoom extends TRoom, Document {}

const roomSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  currentTitles: [{ type: Schema.Types.Mixed }],
  password: { type: String, required: false },
  roomAdmin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  roomType: { type: String, enum: Object.values(RoomType), required: true },
  maxParticipants: { type: Number },
});

roomSchema.pre<IRoom>("remove", async function (next) {
  const room = this;
  await User.updateMany(
    { _id: { $in: room.users } },
    { $pull: { createdRooms: room._id, joinedRooms: room._id } },
  );
  next();
});

roomSchema.methods = {
  addUser(userId: Types.ObjectId) {
    this.users.push(userId);
  },
  removeUser(userId: Types.ObjectId) {
    this.users.pull(userId);
  },
  addTitle(title: any) {
    this.currentTitles.push(title);
  },
  removeTitle(titleId: number) {
    const index = this.currentTitles.findIndex((t: { id: number; }) => t.id === titleId);
    if (index !== -1) this.currentTitles.splice(index, 1);
  },
};

const Room = model<IRoom>("Room", roomSchema);

export default Room;
