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
      throw new ValidationError([{ message: 'User could not be created' }]);
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
    try {
      return User.findById(userId).select("-password").exec();
    } catch (err) {
      console.log(err);
      throw new NotFoundError('User not found');
    }
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
      throw new NotFoundError('User not found');
    }
    user.addCreatedRoom(roomId);
    return user.save();
  }

  static async getUserRooms(userId: Types.ObjectId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const joinedRooms = await user.getJoinedRooms();
    const createdRooms = await user.getCreatedRooms();

    return { joinedRooms: joinedRooms, createdRooms: createdRooms}
  };

  static async addFriend(userId: Types.ObjectId, friendId: Types.ObjectId) {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    
    console.log(userId)
    console.log(friendId)

    const friendAlreadyAdded = user?.friends.includes(friendId);

    if (!user || !friend) {
      throw new ValidationError([{ message: 'Could not add friend, either user or friend dont exist' }]);
    }

    if (friendAlreadyAdded) {
      throw new ValidationError([{ message: 'Friend already added' }]);
    }

    user.friends.push(friendId);
    await user.save();

    friend.friends.push(userId);
    await friend.save();

    return user;
  };

  static async removeFriend(userId: Types.ObjectId, friendId: Types.ObjectId) {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);


    if (!user || !friend) {
      throw new ValidationError([{ message: 'Could not remove friend, either user or friend dont exist' }]);
    }

    if (!user?.friends.includes(friendId)) {
      throw new ValidationError([{ message: 'User is not in the friend list!' }]);
    }

    user.friends = user.friends.filter((id: Types.ObjectId) => !id.equals(friendId));
    await user.save();

    friend.friends = friend.friends.filter((id: Types.ObjectId) => !id.equals(userId));
    await friend.save();

    return user;
  };

  static async getUsers() {
    return User.find().select("-password");
  }

  static async findUsersByName(query: String) {
    const regex = new RegExp(`^${query}`, 'i');
    return User.find({ name: { $regex: regex } }).select("-password");
  }



}
