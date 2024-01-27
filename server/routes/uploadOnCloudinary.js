import { upload } from "../middleware/multer.js";
import { cloudinaryUploadController } from "../controllers/cloudinaryUploadController.js";
import { Router } from "express";

const router = Router();

router.post("/upload", upload.single("file"), cloudinaryUploadController);

export default router;


