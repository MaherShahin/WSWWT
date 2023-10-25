import User, { IUser } from "../models/User";
import Payload from "../types/Payload";
import jwt from "jsonwebtoken";
import config from "config";
import { comparePasswords } from "../utils/encryptionUtils";
import { UserService } from "./userService";
import { ValidationError } from "../errors/ValidationError";
import { AuthorizationError } from "../errors/AuthorizationError";
import { AuthenticationError } from "../errors/AuthenticationError";

interface LoginResponse {
  token: string;
  user: Omit<IUser, "password">;
}

export class AuthService {
  static async loginUser(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const user: IUser = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError(
        "Invalid credentials, no user with that email exists",
      );
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      throw new AuthenticationError(
        "Invalid credentials, password is incorrect",
      );
    }

    const payload: Payload = {
      userId: user.id,
    };

    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: config.get("jwtExpiration"),
    });

    user.password = undefined;

    const userObj: Omit<IUser, "password"> = user.toObject();
    return { token, user: userObj };
  }

  static async registerUser(
    email: string,
    username: string,
    name: string,
    password: string,
  ): Promise<string> {
    let user: IUser = await User.findOne({ email });

    if (user) {
      throw new ValidationError(
        "User already exists, please choose a different email",
      );
    }

    user = await UserService.createUser(password, email, username, name);

    const payload: Payload = {
      userId: user.id,
    };

    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: config.get("jwtExpiration"),
    });

    return token;
  }

  static async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload: Payload | any = jwt.verify(
        refreshToken,
        config.get("jwtSecret"),
      );
      const newAccessToken = jwt.sign(
        { userId: payload.userId },
        config.get("jwtSecret"),
        {
          expiresIn: "1h",
        },
      );
      return newAccessToken;
    } catch (err) {
      console.log(err);
      throw new AuthenticationError("Invalid refresh token");
    }
  }
}
