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
        default: ""
    },
    profilePicturePublicId: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
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