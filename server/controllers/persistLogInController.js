import { userModel as User } from "../models/User.js";
import JWT from "jsonwebtoken";

const persistLogInController = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.refreshToken) return res.sendStatus(401);

    try {
        const RefreshToken = cookies.refreshToken;
        const foundUser = await User.findOne({ refreshToken: RefreshToken });
        if (!foundUser) return res.status(403).json({ message: "No user." });
        const { password, createdAt, updatedAt, email, refreshToken, ...other } = foundUser._doc;


        JWT.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser._id.toHexString() !== decoded.userId) return res.status(403).json({ message: "Invalid token." });

                const accessToken = JWT.sign({
                    userId: decoded.userId,
                    isAdmin: decoded.isAdmin
                }, process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "10s" });

                return res.json({ other, accessToken });
            }
        );
    } catch (error) {
        return res.status(500).json(error);
    }
}

export { persistLogInController };