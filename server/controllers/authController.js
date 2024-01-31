import { userModel as User } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import JWT from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { v4 as uuidv4 } from "uuid";

//Register Controller
const registerController = async (req, res) => {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) { return res.status(401).json({ message: "User already exits with this email." }); }
        else {

            const verificationToken = uuidv4();
            const encryptedPassword = await hashPassword(password);
            // await User.create({ username, email, password: encryptedPassword, verificationToken });

            const verificationLink = `https://social-hub-server-ebsq.onrender.com/api/auth/verify?token=${verificationToken}`
            const msg = {
                to: email,
                from: "socialhub.team.noreply@gmail.com",
                subject: "Email Verification",
                text: `Click the following link to verify your email: ${verificationLink}`,
                html: `<p>Click the following link to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
            };

            try {
                await sgMail.send(msg);
                await User.create({ username, email, password: encryptedPassword, verificationToken });
                res.status(200).json({ message: "Verification email sent. Check email." });
            } catch (error) {
                console.log(error);
                return res.sendStatus(402).json({ message: "Invalid email Id." });
            }

            // return res.sendStatus(200);
        }
    } catch (error) {
        return res.status(500).json({ message: "Registration failed." });
    }
}

//Verify email
const emailVerificationController = async (req, res) => {
    const { token } = req.query;

    const user = await User.find({ verificationToken: token });
    if (!user) {
        return res.status(400).json({ error: 'Invalid verification token' });
    }
    await User.updateOne({ verificationToken: token }, { $set: { isVerified: true } });
    return res.redirect("https://social-hub-pllv.onrender.com/login");
}

//Login Controller
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ message: "Invalid email or password" }); }
        else if (await comparePassword(password, user.password) && user.isVerified) {
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

            res.cookie("refreshToken", RefreshToken, { httpOnly: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000, secure: true });
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

export { registerController, loginController, logoutController, emailVerificationController };