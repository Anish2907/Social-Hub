import { Router } from "express";
import {
    createController,
    updateController,
    deleteController,
    likeController,
    getController,
    timelineController,
    userPostsController
} from "../controllers/postController.js";
import { verifyJWT } from "../middleware/jwtVerification.js";



const router = Router();

//create post
router.post("/", createController);
//update post
router.put("/:id", updateController);
//delete post
router.delete("/:id", verifyJWT, deleteController);
//like post
router.put("/:id/like", likeController);
//get a post
router.get("/:id", getController);
//timeline posts
router.get("/timeline/:userId", timelineController);
//user's posts
router.get("/profile/:userId", userPostsController);



export default router;