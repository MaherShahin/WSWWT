import { Router } from "express";
import { UserController } from "../../controllers/userController";
import authMiddleware from "../../middleware/authMiddleware";
import { FriendController } from "../../controllers/friendController";


const router: Router = Router();

router.post('/acceptFriendRequest', authMiddleware, FriendController.acceptFriendRequest);
router.post('/rejectFriendRequest', authMiddleware, FriendController.rejectFriendRequest);
router.post('/removeFriend', authMiddleware, FriendController.removeFriend);
router.post('/sendFriendRequest', authMiddleware, FriendController.sendFriendRequest);
router.get('/getFriendRequests', authMiddleware, FriendController.getFriendRequests);
  
export default router;

