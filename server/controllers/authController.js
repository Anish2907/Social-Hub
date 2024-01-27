import { userModel as User } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import JWT from "jsonwebtoken";

//Register Controller
const registerController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) { return res.status(401).json({ message: "User already exits with this email." }); }
        else {

            const encryptedPassword = await hashPassword(password);
            await User.create({ username, email, password: encryptedPassword });

            return res.sendStatus(200);
        }
    } catch (error) {
        return res.status(500).json({ message: "Registration failed." });
    }
}

//Login Controller
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ message: "Invalid email or password" }); }
        else if (await comparePassword(password, user.password)) {
            const { password, createdAt, updatedAt, email, refreshToken, ...other } = user._doc;

            //Generate Access token
            const accessToken = JWT.sign({
                userId: user._id,
                isAdmin: user.isAdmin
            }, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" });
            //Generate Refresh token
            const RefreshToken = JWT.sign({
                userId: user._id,
                isAdmin: user.isAdmin
            }, process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" });

            await User.findOneAndUpdate({ email }, { refreshToken: RefreshToken });

            res.cookie("refreshToken", RefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true });
            return res.status(200).json({ other, accessToken });

        } else { return res.status(400).json({ message: "Invalid email or password" }); }
    } catch (error) {
        return res.status(500).json({ message: "Login failed" });
    }
}

//logout controller
const logoutController = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken) return res.sendStatus(204);

        const refreshToken = cookies.refreshToken;
        const foundUser = await User.findOne({ refreshToken });

        if (!foundUser) {
            res.clearCookie("refreshToken", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true });
            return res.sendStatus(204);
        }

        await foundUser.updateOne({ refreshToken: "" });
        res.clearCookie("refreshToken", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export { registerController, loginController, logoutController };