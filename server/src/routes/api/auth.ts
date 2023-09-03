import { Router } from "express";

import { AuthController } from "../../controllers/authController";
import { registerValidation } from "../../middleware/validation/registerValidation";
import { loginValidation } from "../../middleware/validation/loginValidation";

const router: Router = Router();

router.post("/register", registerValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);
router.post("/me", AuthController.getMe);

export default router;
