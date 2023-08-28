import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";

export async function createUser(password: any, user: IUser, email: any, username: any, name: any): Promise<IUser> {

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  user = new User({
    email,
    username,
    name,
    password: passwordHash,
    createdRooms: [],
    joinedRooms: [],
    dateCreated: new Date(),
    profilePicture: "",
    bio: "",
    lastLogin: new Date(),
  });

  try {
    await user.save();
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
  return user;
}