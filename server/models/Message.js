import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    content: {
        type: String
    }
}, { timestamps: true });


export const messageModel = mongoose.model("Message", messageSchema);