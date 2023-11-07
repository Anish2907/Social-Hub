import { Router } from "express";
import { registerController,loginController } from "../controllers/authController.js";

const router = Router();

//Register Route
router.post("/register",registerController);
//Login Route
router.post("/login",loginController);
//Log out Route


export default router;