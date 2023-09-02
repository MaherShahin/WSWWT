import { Router } from "express";
import { UserController } from "../../controllers/userController";
import authMiddleware from "../../middleware/authMiddleware";

const router: Router = Router();

// @route   PUT api/user/update
// @desc    Update user
// @access  Public
router.put("/update", authMiddleware, UserController.update);

// @route  DELETE api/user/delete
// @desc   Delete user
// @access Private
router.delete("/delete", authMiddleware, UserController.delete);


export default router;