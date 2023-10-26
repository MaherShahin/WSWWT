import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { TitleController } from "../../controllers/titleController";

const router: Router = Router();

router.use(authMiddleware);

router.post("/search", TitleController.search);

export default router;
