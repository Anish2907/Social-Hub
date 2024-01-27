import { postModel as Post } from "../models/Post.js";
import { userModel as User } from "../models/User.js";
import cloudinaryDelete from "../utils/cloudinaryDelete.js";


//create post
const createController = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        return res.status(200).json(newPost);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//update post
const updateController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            return res.status(200).json("Updated successfully");
        } else {
            return res.status(403).json("You can update only your post");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

//delete post
const deleteController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.userId) {
            if (post.imgPublicId) {
                const deleted = await cloudinaryDelete(post?.imgPublicId);
                if (!deleted) {
                    return res.status(500).json("Some error occured.");
                }
            }
            await post.deleteOne();
            return res.status(200).json("Deleted successfully");
        } else {
            return res.status(403).json("You can delete only your post");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

//like post
const likeController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("Liked post");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json("Disliked post");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

//get a post
const getController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//get timeline posts
const timelineController = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPost = await Post.find({ userId: currentUser._id });
        const friendPost = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        return res.status(200).json(userPost.concat(...friendPost));
    } catch (error) {
        return res.status(500).json(error);
    }
}

//get user's all post
const userPostsController = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export {
    createController,
    updateController,
    deleteController,
    likeController,
    getController,
    timelineController,
    userPostsController
};