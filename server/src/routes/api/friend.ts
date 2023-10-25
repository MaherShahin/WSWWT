import { Router } from "express";
import { FriendController } from "../../controllers/friendController";
import authMiddleware from "../../middleware/authMiddleware";

const router: Router = Router();

router.use(authMiddleware);

router.post("/acceptFriendRequest", FriendController.acceptFriendRequest);
router.post("/rejectFriendRequest", FriendController.rejectFriendRequest);
router.post("/removeFriend", FriendController.removeFriend);
router.post("/sendFriendRequest", FriendController.sendFriendRequest);
router.get("/getFriendRequests", FriendController.getFriendRequests);

export default router;
