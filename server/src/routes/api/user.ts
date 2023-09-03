import { Router } from "express";
import { UserController } from "../../controllers/userController";
import authMiddleware from "../../middleware/authMiddleware";

const router: Router = Router();

router.get("/rooms", authMiddleware, UserController.getUserRooms)
router.get("/:id", UserController.getUserById);
router.put("/update", authMiddleware, UserController.update);
router.delete("/delete", authMiddleware, UserController.delete);

export default router;