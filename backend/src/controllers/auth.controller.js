import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        //validate
        if (!fullname || !email || !password || password.length < 6) {
            res.status(400).send("All fields are required");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).send("User already exists");
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
            res.status(201)
            .json({_id: newUser._id,
                fullname: newUser.fullname,
                profilePic: newUser.profilePic
            })
        }else{
            res.status(400).json({message: "User has not been created"});
        }
        
    } catch (error) {
        console.log("error in Singup ctr", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const login = (req, res) => {
    res.send("login");
};              

export const logout = (req, res) => {    
    res.send("logout");
};