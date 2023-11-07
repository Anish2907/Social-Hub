import { userModel as User } from "../models/User.js";


//Get a user's info
const getUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.userId);
        const {email,password,createdAt,updatedAt,isAdmin,refreshToken,...other} = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Update a user 
const updateUser = async (req,res)=>{
    if(req.userId === req.params.id || req.isAdmin){
        try {
            await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            return res.status(200).json("Account has been updated.");
        } catch (error) {
            return res.status(500).json(error);
        }
    }else{
        return res.status(403).json("You can update only your account.");
    }
}

//Delete a user
const deleteUser = async (req,res)=>{
    if(req.userId === req.params.id || req.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted.");
        } catch (error) {
            return res.status(500).json(error);
        }
    }else{
        return res.status(403).json("You can delete only your account.");
    }
}

//Follow a user
const followUser = async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}});
                await currentUser.updateOne({ $push: {followings: req.params.id}});
                return res.status(200).json("User has been followed");
            }else{
                return res.status(403).json("You already follow this user");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }else{
        return res.status(403).json("You cannot follow yourself");
    }
}

//Unfollow user
const unfollowUser = async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}});
                await currentUser.updateOne({ $pull: {followings: req.params.id}});
                return res.status(200).json("User has been unfollowed");
            }else{
                return res.status(403).json("You don't follow this user");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }else{
        return res.status(403).json("You cannot unfollow yourself");
    }
}

export {getUser,updateUser,deleteUser,followUser,unfollowUser}