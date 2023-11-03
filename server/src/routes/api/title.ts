import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { TitleController } from "../../controllers/titleController";

const router: Router = Router();

router.use(authMiddleware);

router.post("/search", TitleController.search);

router.get("/get/:id", TitleController.getTitle);
router.post("/search-titles", TitleController.searchTitles)
export default router;
