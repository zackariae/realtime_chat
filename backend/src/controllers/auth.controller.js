import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        //validate
        if (!fullname || !email || !password || password.length < 6) {
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            fullname,
            email,
            password: hash,
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201)
            .json({_id: newUser._id,
                fullname: newUser.fullname,
                profilePic: newUser.profilePic
            })
        }else{
            return res.status(400).json({message: "User has not been created"});
        }
        
    } catch (error) {
        console.log("error in Singup ctr", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        generateToken(user._id, res);
        return res.status(200)
        .json({_id: user._id,
            fullname: user.fullname,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("error in login ctr", error.message);
        return res.status(500).json({message: "Internal Server Error", error:error.message});
    }
};              

export const logout = (req, res) => {    
    try {
        res.clearCookie("jwt");
        return res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log("error in logout ctr", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const updateProfile =async (req, res) => {
    try {

        const { profilePic } = req.body;
        if(!profilePic){
            return res.status(400).json({message: "Profile picture is required"});
        }

        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const uploadedPic = await cloudinary.uploader.upload(profilePic);
        if(!uploadedPic){
            return res.status(400).json({message: "Profile picture could not be uploaded"});
        }
        user.profilePic = uploadedPic.secure_url;
        await user.save();
        return res.status(200)
        .json({_id: user._id,
            fullname: user.fullname,
            profilePic: user.profilePic
        })
        
    } catch (error) {
        console.error("Error in updateProfile:", error); // Log full error object
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}



export const checkAuth = async (req, res) => {
    try {
        res.status(200)
        .json({user: req.user})
    } catch (error) {
        console.log("error in checkAuth ctr", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}