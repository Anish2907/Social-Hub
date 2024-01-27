import cloudinary from "../config/cloudinary.config.js";

const cloudinaryDelete = async (publicId) => {
    try {
        const deletionResult = await cloudinary.uploader.destroy(publicId);

        if (deletionResult.result === "ok") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default cloudinaryDelete;