import { Router } from "express";
import { getAllMessagesController, addMessageController } from "../controllers/messageController.js";

const router = Router();

//Get all messages of a conversation
router.get("/:conversationId", getAllMessagesController);

//Add a new message to the conversation
router.post("/", addMessageController);

export default router;