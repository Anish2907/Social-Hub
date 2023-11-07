import { userModel as User } from "../models/User.js";


const logoutController = async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies.refreshToken) return res.status(401);

    try {
        const refreshToken = cookies.refreshToken;
        const foundUser = await User.findOne({refreshToken});
        if(!foundUser){
            res.clearCookie("refreshToken", {httpOnly:true,maxAge:24*60*60*1000});
            return res.sendStatus(403);
        }   

        await foundUser.updateOne({refreshToken:""});
        res.clearCookie("refreshToken", {httpOnly:true,maxAge:24*60*60*1000});
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

export {logoutController};