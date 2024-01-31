import { Router } from "express";
import { registerController, loginController, logoutController, emailVerificationController } from "../controllers/authController.js";

const router = Router();

//Register Route
router.post("/register", registerController);
//Email verification Route
router.get("/verify", emailVerificationController);
//Login Route
router.post("/login", loginController);
//Log out Route
router.get("/logout", logoutController);


export default router;