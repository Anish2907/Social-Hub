import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/dbConfig.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import refreshRoute from "./routes/refreshToken.js";
import logoutRoute from "./routes/logout.js";
import postRoute from "./routes/post.js";



dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 8080;


app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth",authRoute);
app.use("/api/refresh",refreshRoute);
app.use("/api/logout",logoutRoute);
app.use("/api/user",userRoute);
app.use("/api/posts",postRoute);



app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));