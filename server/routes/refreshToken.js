import { Router } from "express";
import { refreshTokenController } from "../controllers/refreshTokenController.js";

const router = Router();


router.get("/",refreshTokenController);

export default router;