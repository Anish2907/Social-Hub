import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";


import credentials from "./middleware/credentials.js";
import connectDB from "./config/dbConfig.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import refreshRoute from "./routes/refreshToken.js";
import postRoute from "./routes/post.js";
import persistLogInRoute from "./routes/persistLogIn.js";
import uploadRoute from "./routes/uploadOnCloudinary.js";


dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 8000;


app.use(credentials);
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
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




app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));