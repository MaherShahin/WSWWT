import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import Room, { IRoom } from "../../models/Room";
import { CustomError } from "../../errors/CustomError";
import { comparePasswords } from "../../utils/encryptionUtils";
import { Types } from "mongoose";
import User, { IUser } from "../../models/User";
import { RequestErrorCodes } from "../../constants/ErrorCodes";

export const validateCreateRoom = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const roomData = req.body as any;

  if (roomData.roomType === "private" && !roomData.password) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Password must be provided for private room",
    );
  }

  if (
    !roomData.roomType.includes("public") &&
    !roomData.roomType.includes("private")
  ) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Room Type must be either public or private",
    );
  }

  if (roomData.maxParticipants < 1 || roomData.maxParticipants > 25) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Max participants must be greater than 0 and less than 25.",
    );
  }

  next();
};

export const validateRoom = (room: IRoom): void => {
  if (!room.name || room.name.length < 3 || room.name.length > 50) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Room name must be between 3 and 50 characters.",
    );
  }

  if (!room.description || room.description.length === 0) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Description must not be empty.",
    );
  }

  if (room.roomType === "private" && !room.password) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Password must be provided for a private room.",
    );
  }

  if (!room.roomAdmin) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Invalid room admin.",
    );
  }

  if (room.maxParticipants <= 0 || room.maxParticipants > 25) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Max participants must be greater than 0 and less than 25.",
    );
  }

  if (room.users.length > room.maxParticipants) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Max participants must be greater than number of users in room.",
    );
  }

  if (room.users.length === 0) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Room must have at least one user.",
    );
  }

  if (room.roomType !== "private" && room.roomType !== "public") {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Invalid room type.",
    );
  }

  if (room.roomType === "public" && room.password) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Public room cannot have a password.",
    );
  }
};

export const validateRoomJoin = (
  user: IUser,
  room: IRoom,
  password?: string,
) => {
  if (!user || !room) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "User or room not found",
    );
  }

  if (room.users.includes(user._id)) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "User already in room",
    );
  }

  if (room.users.length >= room.maxParticipants) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Room is full",
    );
  }

  if (room.roomType === "private" && !password) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Room is private, you need to provide a password",
    );
  }

  if (!comparePasswords(password, room.password)) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Incorrect password",
    );
  }

  return { user, room };
};

export const validateRoomLeave = (user: IUser, room: IRoom) => {
  if (!user || !room) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "User or room not found",
    );
  }

  if (!room.users.includes(user._id)) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "User not in room",
    );
  }

  if (room.roomAdmin.equals(user._id)) {
    throw new CustomError(
      400,
      RequestErrorCodes.VALIDATION_ERROR,
      "Room admin cannot leave room",
    );
  }
};
