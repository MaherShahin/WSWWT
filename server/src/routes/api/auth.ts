import bcrypt from "bcryptjs";
import config from "config";
import { Router, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

import auth from "../../middleware/auth";
import Payload from "../../types/Payload";
import Request from "../../types/Request";
import User, { IUser } from "../../models/User";
import { validateRequest } from "../../middleware/validation/requestValidation";
import { ValidationError } from "../../middleware/validation/ValidationError";

const router: Router = Router();

// @route   GET api/auth
// @desc    Get authenticated user given the token
// @access  Private
router.get("/", auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = await User.findById(req.userId).select("-password");
    res.json({ user: { ...user.toObject(), password: undefined }});
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ], validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;
    
    try {
      let user: IUser = await User.findOne({ email });

      if (!user) {
        throw new ValidationError("Invalid Credentials", HttpStatusCodes.BAD_REQUEST);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new ValidationError("Invalid Credentials", HttpStatusCodes.BAD_REQUEST);
      }

      const payload: Payload = {
        userId: user.id,
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: config.get("jwtExpiration") },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user: { ...user.toObject(), password: undefined } });
        }
      );
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }
);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ errors: [{ msg: message }] });
});


export default router;
