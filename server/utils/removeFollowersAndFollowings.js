import { userModel as User } from "../models/User.js";

const removeUser = async (userIdToRemove) => {
    try {
        const userToRemove = await User.findById(userIdToRemove);

        const followersToUpdate = await User.find({ followings: userIdToRemove });

        const followersUpdatePromises = followersToUpdate.map(async (follower) => {
            follower.followings = follower.followings.filter((id) => id !== userIdToRemove);
            await follower.save();
        });
        await Promise.all(followersUpdatePromises);


        const followingsToUpdate = await User.find({ _id: { $in: userToRemove.followings } });

        const followingsUpdatePromises = followingsToUpdate.map(async (following) => {
            following.followers = following.followers.filter((id) => id !== userIdToRemove);
            await following.save();
        });
        await Promise.all(followingsUpdatePromises);

    } catch (error) {
        console.log(error);
    }
}

export default removeUser;