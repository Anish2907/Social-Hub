import { Router } from "express";
import { getConversationController, newConversationController } from "../controllers/conversationController.js";

const router = Router();

//Get a conversation
router.get("/:userId", getConversationController);

//Create a new conversation
router.post("/", newConversationController);

export default router;
