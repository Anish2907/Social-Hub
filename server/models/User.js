import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    verificationToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    },
    profilePicturePublicId: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: "https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Colorful-Circle-Simple-Background-Image-1.jpg"
    },
    coverPicturePublicId: {
        type: String,
        default: ""
    },
    desc: {
        type: String
    },
    city: {
        type: String
    },
    from: {
        type: String
    },
    instaUrl: {
        type: String
    },
    fbUrl: {
        type: String
    },
    twitterUrl: {
        type: String
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    },
    followings: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

export const userModel = mongoose.model("User", userSchema);