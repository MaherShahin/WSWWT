import { Document, model, Schema } from "mongoose";
import User from "./User";

/**
 * Type to model the Room Schema for TypeScript.
 * @param name:string
 * @param description:string
 * @param users:string[]
 * @param currentSeries:string[]
 * @param password:string
 * @param roomAdmin:string
 * @param roomType:'public' | 'private'
 * @param maxParticipants:number
 * @param criteria:string[]
 */

export type TRoom = {
  name: string;
  description?: string;
  users: string[];
  currentSeries?: string[];
  password: string;
  roomAdmin: string;
  roomType: 'public' | 'private';
  maxParticipants?: number;
  criteria?: string[];
};

/**
 * Mongoose Document based on TRoom for TypeScript.
 * https://mongoosejs.com/docs/documents.html
 *
 * TRoom
 * @param name:string
 * @param description:string
 * @param users:string[]
 * @param currentSeries:string[]
 * @param password:string
 * @param roomAdmin:string
 * @param roomType:'public' | 'private'
 * @param maxParticipants:number
 * @param criteria:string[]
 */

export interface IRoom extends TRoom, Document {}

const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  users: {
    type: [String],
    default: [],
  },
  currentSeries: {
    type: [String],
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
  roomAdmin: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    enum: ['public', 'private'],
    required: true,
  },
  maxParticipants: {
    type: Number,
  },
  criteria: {
    type: [String],
    default: [],
  },
});

/**
 * Mongoose Model based on TRoom for TypeScript.
 * https://mongoosejs.com/docs/models.html
 *
 * TRoom
 * @param name:string
 * @param description:string
 * @param users:string[]
 * @param currentSeries:string[]
 * @param password:string
 * @param roomAdmin:string
 * @param roomType:'public' | 'private'
 * @param maxParticipants:number
 * @param criteria:string[]
 */

roomSchema.pre<IRoom>("remove", async function (next) {
  const room = this;
  await User.updateMany(
      { _id: { $in: room.users }},
      { $pull: { createdRooms: room._id, joinedRooms: room._id }}
  );
  next();
});

const Room = model<IRoom>("Room", roomSchema);

export default Room;
