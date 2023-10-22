import { Types } from "mongoose";
import { NotFoundError } from "../errors/NotFoundError";
import User, { IUser } from "../models/User";
import { hashPassword } from "../utils/encryptionUtils";
import { DatabaseError } from "../errors/DatabaseError";

export class UserService {
  static async createUser(password: string, email: string, username: string, name: string): Promise<IUser> {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      password: hashedPassword,
      email: email,
      username: username,
      name: name
    });

    if (!user) {
      throw new DatabaseError('Could not create user');
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

  static async deleteUser(userId: Types.ObjectId): Promise<IUser> {
    const user: IUser = await User.findById(userId).select("-password");

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await user.remove();
    return user;
  }

  static async findUserById(userId: Types.ObjectId): Promise<IUser | null> {

    const user: IUser = await User.findById(userId).select("-password");

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  static async addJoinedRoomToUser(userId: Types.ObjectId, roomId: Types.ObjectId): Promise<IUser | null> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found, you cant add a joined room to a user that doesnt exist');
    };
    user.addJoinedRoom(roomId);
    return user.save();
  }

  static async removeJoinedRoomFromUser(userId: Types.ObjectId, roomId: Types.ObjectId): Promise<IUser | null> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found, you cant remove a joined room from a user that doesnt exist');
    };    
    user.removeJoinedRoom(roomId);
    return user.save();
  }

  static async addCreatedRoomToUser(userId: Types.ObjectId, roomId: Types.ObjectId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found, you cant add a created room to a user that doesnt exist');
    }
    user.addCreatedRoom(roomId);
    return user.save();
  }

  static async getUserRooms(userId: Types.ObjectId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Could not get user rooms, user not found');
    }

    const joinedRooms = await user.getJoinedRooms();
    const createdRooms = await user.getCreatedRooms();

    return { joinedRooms: joinedRooms, createdRooms: createdRooms}
  };

  static async getUsers() {
    return User.find().select("-password");
  }

  static async findUsersByName(query: String) {
    const regex = new RegExp(`^${query}`, 'i');
    return User.find({ name: { $regex: regex } }).select("-password");
  }

}
