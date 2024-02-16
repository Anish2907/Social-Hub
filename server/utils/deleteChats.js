import { conversationModel as Conversation } from "../models/Conversation.js";
import { messageModel as Message } from "../models/Message.js";

const deleteChat = async (conversationId) => {
    try {
        const allMessages = await Message.find({ conversationId });
        await Promise.all(
            allMessages.map(message => {
                return Message.findByIdAndDelete(message._id);
            })
        );
        await Conversation.findByIdAndDelete(conversationId);
    } catch (error) {
        console.log(error);
    }
}

export default deleteChat;