import express from "express";
import { RoomController } from "../../controllers/roomController";
import authMiddleware from "../../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.get("/:id", RoomController.getRoomById);
router.post("/create", RoomController.createRoom);
router.post("/join/:roomId", RoomController.joinRoom);
router.post("/leave/:roomId", RoomController.leaveRoom);
router.delete("/delete/:roomId", RoomController.deleteRoom);
router.put("/update/:roomId", RoomController.updateRoom);

export default router;
