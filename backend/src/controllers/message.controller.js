import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "cloudinary";



export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;  
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password");
        return res.status(200).json({users: filteredUsers});
    } catch (error) {
        console.log("error in getUsersForSidebar ctr", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const createMessage = async (req, res) => {}
export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({$or: [
            {senderId: myId, receiverId: userToChatId},
            {senderId: userToChatId, receiverId: myId}]})
            .populate("senderId", "fullname profilePic")
            .populate("receiverId", "fullname profilePic");

        return res.status(200).json({messages});
    } catch (error) {
        console.log("error in getMessages ctr", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const sendMessage = async (req, res) => {
    try {
        const { id:userToChatId } = req.params;
        const { text, image } = req.body;
        const myId = req.user._id;

        if(!text && !image){
            return res.status(400).json({message: "Message is required"});
        }
        if(image){
            const uploadedPic = await cloudinary.uploader.upload(image);
            if(!uploadedPic){
                return res.status(400).json({message: "Image could not be uploaded"});
            }
            image = uploadedPic.secure_url;
        }

        const message = await Message.create({
            senderId: myId, 
            receiverId: userToChatId, 
            text, 
            image});
        
        //todo: realtime functionality here : socket.io
        return res.status(200).json({message});
        
    } catch (error) {
        console.log("error in sendMessage ctr", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}