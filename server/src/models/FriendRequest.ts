import { Document, model, Schema, Types } from "mongoose";
import { IUser } from "./User";

export type TFriendRequest = {
  from: Types.ObjectId;
  to: Types.ObjectId;
  status: string; // could be an enum ["pending", "accepted", "rejected"]
  dateCreated: Date;
};

export interface IFriendRequest extends TFriendRequest, Document {}

const friendRequestSchema: Schema = new Schema({
  from: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const FriendRequest = model<IFriendRequest>(
  "FriendRequest",
  friendRequestSchema,
);

export default FriendRequest;
