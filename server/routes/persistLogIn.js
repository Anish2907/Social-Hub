import { Router } from "express";
import { persistLogInController } from "../controllers/persistLogInController.js";

const router = Router();

router.get("/", persistLogInController);

export default router;