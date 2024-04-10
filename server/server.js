import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server as SocketIOServer } from "socket.io";
import http from "http";


import credentials from "./middleware/credentials.js";
import connectDB from "./config/dbConfig.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import refreshRoute from "./routes/refreshToken.js";
import postRoute from "./routes/post.js";
import persistLogInRoute from "./routes/persistLogIn.js";
import uploadRoute from "./routes/uploadOnCloudinary.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/message.js";


dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "https://social-hub-pllv.onrender.com"
        // origin: ["http://localhost:3000"]
    }
});


app.use(credentials);
app.use(express.json());
app.use(cors({
    origin: "https://social-hub-pllv.onrender.com"
    // origin: ["http://localhost:3000"]
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth", authRoute);
app.use("/api/refresh", refreshRoute);
app.use("/api/persistLogIn", persistLogInRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/cloudinary", uploadRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);



const connectedUsersMap = new Map();

io.on("connection", (socket) => {
    //add new User
    socket.on("newUser", userId => {
        connectedUsersMap.set(userId, socket.id);
        const onlineUsers = [...connectedUsersMap.keys()];
        io.emit("onlineUsers", onlineUsers);
    });

    //receive message
    socket.on("sendMessage", (senderId, receiverId, message) => {
        //send to particular user
        const receiverSocket = connectedUsersMap.get(receiverId);
        io.to(receiverSocket).emit("getMessage", { message, senderId });
    });

    //user disconnected
    socket.on("disconnect", () => {
        connectedUsersMap.forEach((disconnectedSocketId, key) => {
            if (disconnectedSocketId === socket.id) {
                connectedUsersMap.delete(key);
            }
        })
        const onlineUsers = [...connectedUsersMap.keys()];
        io.emit("onlineUsers", onlineUsers);
    })
});




server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));