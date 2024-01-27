import { userModel as User } from "../models/User.js";
import { postModel as Post } from "../models/Post.js";
import cloudinaryDelete from "../utils/cloudinaryDelete.js";
import deletePost from "../utils/deletePost.js";
import removeUser from "../utils/removeFollowersAndFollowings.js";

//Get a user's info
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const { email, password, createdAt, updatedAt, isAdmin, refreshToken, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Update a user 
const updateUser = async (req, res) => {
    if (req.userId === req.params.id || req.isAdmin) {
        try {
            const currentUser = await User.findById(req.userId);
            if (req.body.coverPicture) {
                await cloudinaryDelete(currentUser.coverPicturePublicId);
            }
            if (req.body.profilePicture) {
                await cloudinaryDelete(currentUser.profilePicturePublicId);
            }
            await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            return res.status(200).json("Account has been updated.");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You can update only your account.");
    }
}

//Delete a user
const deleteUser = async (req, res) => {
    if (req.userId === req.params.id || req.isAdmin) {
        try {
            const allUserPosts = await Post.find({ userId: req.userId });

            await Promise.all(
                allUserPosts.map(post => {
                    return deletePost(post);
                })
            );

            await removeUser(req.userId);
            // if (currentUser.profilePicturePublicId) {
            //     await cloudinaryDelete(profilePicturePublicId);
            // }
            // if (currentUser.coverPicturePublicId) {
            //     await cloudinaryDelete(coverPicturePublicId);
            // }
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted.");
        } catch (error) {
            return res.status(500).json("Some error occured.");
        }
    } else {
        return res.status(403).json("You can delete only your account.");
    }
}

//Follow a user
const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                return res.status(200).json("User has been followed");
            } else {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                return res.status(200).json("User has been unfollowed");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You cannot follow yourself");
    }
}

//Unfollow user
const unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                return res.status(200).json("User has been unfollowed");
            } else {
                return res.status(403).json("You don't follow this user");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You cannot unfollow yourself");
    }
}

//Get all user
const getAllUser = async (req, res) => {
    try {
        const userList = await User.find({});
        const index = userList.indexOf(req.params.id);
        userList.splice(index, 1);
        const unFollowedUsers = userList.filter((user) => { return !user.followers.includes(req.params.id) });
        const result = [];
        unFollowedUsers.map(user => {
            result.push({
                _id: user._id,
                username: user.username,
                profilePicture: user.profilePicture,
            })
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json("Some error occured.")
    }
}

export { getUser, updateUser, deleteUser, followUser, unfollowUser, getAllUser }