import config from "config";
import { Router, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import Payload from "../../types/Payload";
import Request from "../../types/Request";
import User, { IUser } from "../../models/User";
import { TUser } from "src/models/TUser";
import { createUser } from "../../utils/userUtils";
import auth from "../../middleware/auth";
import { validateRequest } from "../../middleware/validation/requestValidation";
import { ValidationError } from "../../middleware/validation/ValidationError";

const router: Router = Router();

// @route   POST api/user/register
// @desc    Register user given their email, username, name, and password, returns the token upon successful registration
// @access  Public
router.post(
  "/register",
  [
    check("email", "Please include a valid email").isEmail(),
    check("username", "Username is required").notEmpty(),
    check("name", "Name is required").notEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ], validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {

    const { email, username, name, password } = req.body;

    try {
      let user: IUser = await User.findOne({ email });

      if (user) {
        throw new ValidationError("User already exists", HttpStatusCodes.BAD_REQUEST);
      }

      user = await createUser(password, user, email, username, name);

      const payload: Payload = {
        userId: user.id,
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: config.get("jwtExpiration") },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }
);

// @route   PUT api/user/update
// @desc    Update user
// @access  Public
router.put("/update", auth, async (req: Request, res: Response, next: NextFunction) => {

  const { bio, name } = req.body;
  try {
    const user: IUser = await User.findById(req.userId).select("-password");

    if (!user) {
      throw new ValidationError("User not found", HttpStatusCodes.BAD_REQUEST);
    }
    user.bio = bio;
    user.name = name;
    user.save();
    res.status(HttpStatusCodes.OK).json({ user: user.toObject() });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route  DELETE api/user/delete
// @desc   Delete user
// @access Private
router.delete("/delete", auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = await User.findById(req.userId).select("-password");

    if (!user) {
      throw new ValidationError("User not found", HttpStatusCodes.BAD_REQUEST);
    }

    await user.remove();
    res.status(HttpStatusCodes.OK).send("User deleted");
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ errors: [{ msg: message }] });
});


export default router;