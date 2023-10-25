import { Router } from "express";
import { UserController } from "../../controllers/userController";
import authMiddleware from "../../middleware/authMiddleware";

const router: Router = Router();

// Unprotected routes
router.get("/find/:id", UserController.getUserById);


router.use(authMiddleware);

// Protected routes
router.get("/rooms", UserController.getUserRooms);
router.put("/update", UserController.update);
router.delete("/delete", UserController.delete);
router.get('/search', UserController.searchUsers);
  
export default router;

