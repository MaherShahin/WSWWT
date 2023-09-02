// import { Router, Response, NextFunction } from "express";
// import { check, validationResult } from "express-validator";
// import HttpStatusCodes from "http-status-codes";
// import Request from "../../types/Request";
// import User, { IUser } from "../../models/User";
// import auth from "../../middleware/authMiddleware";
// import Room from "../../models/Room";
// import { validateRoomId } from "../../middleware/validation/roomValidation";
// import bcrypt from "bcryptjs";
// import { ValidationError } from "../../errors/validationError";

// const router: Router = Router();

// // @route   POST api/room/create
// // @desc    Create a room given the room name, description, and password
// // @access  Private
// router.post('/create', auth,
//   [
//     check('name', 'Room name is required').notEmpty(),
//     check('password', 'Password is required and has to be at least 6 chars').notEmpty().isLength({ min: 6 }),
//     check('roomType', 'Room type is required').notEmpty(),
//     check('description', 'Description is required').notEmpty(),
//     check('criteria', 'Criteria is required').notEmpty(),
//     check('maxParticipants', 'Max participants is required and must be a number').notEmpty().isNumeric(),
//   ], validateRequest,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {

//       let user: IUser = await User.findById(req.userId).select("-password");

//       let room = await createRoom(req, user);

//       await user.updateOne({
//         "_id": user._id,
//         $push: {
//           createdRooms: room._id,
//           joinedRooms: room._id
//         }
//       });

//       if (room) {
//         res.status(HttpStatusCodes.OK).json({ room: { ...room.toObject(), password: undefined }, user: { ...user.toObject(), password: undefined } });
//       }
//     } catch (err) {
//       console.error(err.message);
//       next(err);
//     }
//   }
// );

// // @route   GET api/room/:roomId
// // @desc    Get room by id
// // @access  Private
// router.get('/:roomId', auth, validateRoomId, async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     let roomId: string = String(req.params.roomId);

//     const room = await Room.findById(roomId);

//     if (room) {
//       res.status(HttpStatusCodes.OK).json({ room: { ...room.toObject(), password: undefined } });
//     } else {
//       res.status(HttpStatusCodes.NOT_FOUND).send("Room not found");
//     }
//   } catch (err) {
//     console.error(err.message);
//     next(err);
//   }
// }
// );

// // @route   PUT api/room/update/:roomId
// // @desc    Update room info by roomId
// // @access  Private
// router.put('/update/:roomId', auth, validateRoomId, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const roomId: string = String(req.params.roomId);
//     const room = await Room.findById(roomId);

//     if (room) {
//       const updatedRoom = await updateRoom(req, room);
//       res.status(HttpStatusCodes.OK).json({ room: { ...updatedRoom.toObject(), password: undefined } });
//     } else {
//       res.status(HttpStatusCodes.NOT_FOUND).send("Room not found");
//     }
//   }
//   catch (err) {
//     console.error(err.message);
//     next(err);
//   }

// });

// // @route   DELETE api/room/delete/:roomId
// // @desc    Delete room by roomId
// // @access  Private
// router.delete('/delete/:roomId', auth, validateRoomId, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const roomId: string = String(req.params.roomId);
//     const room = await Room.findById(roomId);
//     await room.remove();
//     res.status(HttpStatusCodes.OK).send("Room deleted");
//   } catch (err) {
//     console.error(err.message);
//     next(err);
//   }
// });

// // @route   POST api/room/join/:roomId
// // @desc    Join a room by roomId
// // @access  Private
// router.post('/join/:roomId', auth, validateRoomId, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const roomId: string = String(req.params.roomId);
//     const room = await Room.findById(roomId);

//     if (!room) {
//       return res.status(HttpStatusCodes.NOT_FOUND).send("Room not found");
//     }

//     const user = await User.findById(req.userId).select("-password");
//     await addUserToRoom(room, user, req);
//     res.status(HttpStatusCodes.OK).json({ room: { ...room.toObject(), password: undefined }, user: { ...user.toObject(), password: undefined } });

//   } catch (err) {
//     console.error(err.message);
//     next(err);
//   }
// });

// // @route   POST api/room/leave/:roomId
// // @desc    Leave a room by roomId
// // @access  Private
// router.post('/leave/:roomId', auth, validateRoomId, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId: string = String(req.userId);
//     const roomId: string = String(req.params.roomId);
//     const room = await Room.findById(roomId);

//     if (!room) {
//       throw new ValidationError("Room not found", HttpStatusCodes.NOT_FOUND);
//     }

//     room.users = room.users.filter((user) => user.toString() !== userId);
//     if (room.users.length === 0) {
//       await room.remove();
//     } else {
//       await room.save();
//     }

//     res.status(HttpStatusCodes.OK).json({ room: { ...room.toObject(), password: undefined } });
//   } catch (err) {
//     console.error(err.message);
//     next(err);
//   }
// });

// // @route   POST api/room/kick/:roomId
// // @desc    Kick a user from a room by roomId
// // @access  Private
// router.post('/kick/:roomId', auth, validateRoomId, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId: string = String(req.userId);
//     const roomId: string = String(req.params.roomId);

//     const userToBeKickedId: string = String(req.body.userToBeKickedId);
//     const userToBeKicked: IUser = await User.findById(userToBeKickedId);

//     const room = await Room.findById(roomId);

//     if (!room) {
//       throw new ValidationError("Room not found", HttpStatusCodes.NOT_FOUND);
//     }

//     if (room.roomAdmin.toString() !== userId) {
//       throw new ValidationError("You are not the room admin", HttpStatusCodes.UNAUTHORIZED);
//     }

//     if (userToBeKickedId === room.roomAdmin.toString()) {
//       throw new ValidationError("You cannot kick yourself", HttpStatusCodes.BAD_REQUEST);
//     }

//     if (!userToBeKickedId) {
//       throw new ValidationError("User to be kicked id is required", HttpStatusCodes.BAD_REQUEST);
//     }

//     room.users = room.users.filter((user) => user.toString() !== userToBeKickedId);

//     await room.save();

//     await userToBeKicked.updateOne({
//       "_id": userToBeKickedId,
//       $pull: {
//         joinedRooms: roomId
//       }
//     });

//     res.status(HttpStatusCodes.OK).json({ room: { ...room.toObject(), password: undefined } });
//   } catch (err) {
//     console.error(err.message);
//     next(err);
//   }
// });

// router.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
//   const message = err.message || 'Internal Server Error';
//   res.status(statusCode).json({ errors: [{ msg: message }] });
// });


// export default router;