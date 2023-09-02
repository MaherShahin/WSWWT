import { Types } from "mongoose";
import { NotFoundError } from "../errors/notFoundError";
import { ValidationError } from "../errors/validationError";
import User, { IUser } from "../models/User";
import { hashPassword } from "../utils/encryptionUtils";

export class UserService {
  static async createUser(password: string, email: string, username: string, name: string): Promise<IUser> {
    const hashedPassword = await hashPassword(password);

    const user = new User({
      email,
      username,
      name,
      password: hashedPassword,
    });

    if (!user) {
      throw new ValidationError('User could not be created');
    }

    await user.save();
    return user;
  }

  static async updateUser(userId: Types.ObjectId, bio: string, name: string): Promise<IUser> {
    const user: IUser = await User.findById(userId).select("-password");

    if (!user) {
      throw new NotFoundError('User not found');
    }


    user.bio = bio;
    user.name = name;
    await user.save();
    return user;
  }

  static async deleteUser(userId: Types.ObjectId): Promise<void> {
    const user: IUser = await User.findById(userId).select("-password");

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await user.remove();
  }

  static async findUserById(userId: Types.ObjectId): Promise<IUser | null> {
    return User.findById(userId).select("-password").exec();
  }

  static async addJoinedRoomToUser(userId: Types.ObjectId, roomId: Types.ObjectId): Promise<IUser | null> {
    const user = await this.findUserById(userId);
    if (!user) return null;
    user.addJoinedRoom(roomId);
    return user.save();
  }

  static async removeJoinedRoomFromUser(userId: Types.ObjectId, roomId: Types.ObjectId): Promise<IUser | null> {
    const user = await this.findUserById(userId);
    if (!user) return null;
    user.removeJoinedRoom(roomId);
    return user.save();
  }

  static async addCreatedRoomToUser(userId: Types.ObjectId, roomId: Types.ObjectId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError('User not found');
    }
    user.addCreatedRoom(roomId);
    return user.save();
  }
}
