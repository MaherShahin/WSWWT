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

  static async updateUser(userId: string, bio: string, name: string): Promise<IUser> {
    const user: IUser = await User.findById(userId).select("-password");

    if (!user) {
      throw new NotFoundError('User not found');
    }


    user.bio = bio;
    user.name = name;
    await user.save();
    return user;
  }

  static async deleteUser(userId: string): Promise<void> {
    const user: IUser = await User.findById(userId).select("-password");

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await user.remove();
  }
}
