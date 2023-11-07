import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    desc:{
        type:String
    },
    imgURL:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    }
},{timestamps:true});


export const postModel = mongoose.model("Post",postSchema);