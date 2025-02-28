import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import messagesRoutes from "./routes/message.route.js";
import cors from "cors";
import {app, server} from "./lib/socket.js";
import path from "node"

dotenv.config();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

const __dirname = path.resolve();
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
}

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
})
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    connectDB();
})