import { Router } from "express";
import { UserController } from "../../controllers/userController";
import authMiddleware from "../../middleware/authMiddleware";

const router: Router = Router();

router.put("/update", authMiddleware, UserController.update);
router.delete("/delete", authMiddleware, UserController.delete);
router.get("/:id", UserController.getUserById);

export default router;