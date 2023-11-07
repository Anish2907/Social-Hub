import { Router } from "express";
import { verifyJWT } from "../middleware/jwtVerification.js";
import { getUser,updateUser,deleteUser,followUser,unfollowUser } from "../controllers/userController.js";


const router = Router();


//Get User Info
router.get("/:userId",getUser);
//Update user
router.put("/:id",verifyJWT,updateUser);
//Delete user
router.delete("/:id",verifyJWT,deleteUser);
//Follow a user
router.put("/:id/follow", followUser);
//Unfollow a user
router.put("/:id/unfollow", unfollowUser);




export default router;