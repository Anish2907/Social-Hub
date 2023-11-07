import {Router} from "express";
import { logoutController } from "../controllers/logoutController.js";

const router = Router();

router.get("/",logoutController);

export default router;