import { messageModel as Message } from "../models/Message.js";

// Get all messages
const getAllMessagesController = async (req, res) => {
    try {
        const allMessages = await Message.find({ conversationId: req.params.conversationId });
        return res.status(200).json(allMessages);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Add a new message
const addMessageController = async (req, res) => {
    try {
        const newMessage = await Message.create(req.body);
        return res.status(200).json(newMessage);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export { getAllMessagesController, addMessageController };