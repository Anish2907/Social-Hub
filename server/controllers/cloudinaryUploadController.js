import fs from "fs";
import cloudinary from "../config/cloudinary.config.js";


const cloudinaryUploadController = async (req, res) => {
    try {
        if (!req.file) return null;
        const response = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
        return res.status(200).json({ url: response.secure_url, publicId: response.public_id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error. Upload failed." });
    } finally {
        fs.unlinkSync(req.file.path);
    }
}

export { cloudinaryUploadController };