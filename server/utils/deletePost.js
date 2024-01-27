import { postModel as Post } from "../models/Post.js";
import cloudinaryDelete from "./cloudinaryDelete.js";

const deletePost = async (post) => {
    try {
        if (post.imgPublicId) {
            await cloudinaryDelete(post.imgPublicId);
        }
        await Post.findByIdAndDelete(post._id);
    } catch (error) {
        console.log(error);
    }
}

export default deletePost;