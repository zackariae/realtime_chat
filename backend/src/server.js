import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    connectDB();
})