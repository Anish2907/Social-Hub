import { userModel as User } from "../models/User.js";
import { hashPassword,comparePassword } from "../utils/bcrypt.js";
import JWT from "jsonwebtoken";

//Register Controller
const registerController = async(req,res)=>{
    const {username,email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){res.status(401).json({message:"User already exits with this email."});}
        else{

            const encryptedPassword = await hashPassword(password);
            await User.create({username,email,password:encryptedPassword});

            return res.sendStatus(200);
        }
    } catch (error) {
        return res.status(500).json({message:"Registration failed."});
    }
}

//Login Controller
const loginController = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){res.status(400).json({message:"Invalid email or password"});}
        else if(await comparePassword(password,user.password)){
            const {password,createdAt,updatedAt,email,refreshToken,...other} = user._doc;

            //Generate Access token
            const accessToken = JWT.sign({
                userId:user._id,
                isAdmin:user.isAdmin
            },process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"30m"});
            //Generate Refresh token
            const RefreshToken = JWT.sign({
                userId:user._id,
                isAdmin:user.isAdmin
            },process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"});

            await User.findOneAndUpdate({email},{refreshToken:RefreshToken});

            res.cookie("refreshToken",RefreshToken,{httpOnly:true, maxAge:24*60*60*1000});
            res.status(200).json({other,accessToken});
            
        }else{res.status(400).json({message:"Invalid email or password"});}
    } catch (error) {
        res.status(500).json({message:"Login failed"});
    }
}

export {registerController,loginController};