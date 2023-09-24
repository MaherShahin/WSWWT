import config from "config";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import Payload from "../types/Payload";
import Request from "../types/Request";
import { AuthenticationError } from "../errors/authenticationError";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");

  if (!token) {
    throw new AuthenticationError("No token, authorization denied");
  }
  try {
    const payload: Payload | any = jwt.verify(token, config.get("jwtSecret"));
    req.userId = payload.userId;
    next();
  } catch (err) {
    console.log(err);
    throw new AuthenticationError("Token is not valid");
  }
}
