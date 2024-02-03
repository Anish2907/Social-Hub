import { conversationModel as Conversation } from "../models/Conversation.js";

//Get all conversation of a user
const getConversationController = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        return res.status(200).json(conversations);
    } catch (error) {
        return res.staus(500).json(error);
    }
}

//Create a new conversation
const newConversationController = async (req, res) => {
    try {
        const newChat = await Conversation.create({
            members: [req.body.senderId, req.body.receiverId]
        });
        return res.status(200).json(newChat);
    } catch (error) {
        return res.staus(500).json(error);
    }
}

export { getConversationController, newConversationController };