import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;