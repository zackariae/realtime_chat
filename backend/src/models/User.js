import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePic:{
        type: String,
        default: "",
    },
    fullname: { 
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

export default mongoose.model("User", userSchema);
