import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from ""
import messageRoutes from ""
import db_config from ""

dotenv.config()
const app = express
const PORT = process.env.PORT || 4000

//middlewares
app.use(cors({origin:"http://localhost:4000"}));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)



app.listen(PORT, ()=>{
    db_config()
    console.info(`The server is running on http://localhost:${PORT}`)
})



//db_config()
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const db_config =async ()=>{
    try {
        let connected =await mongoose.connect(process.env.DB_URI);
        console.info(`DB connected to host: ${connected.connection.host}`)
    } catch (error) {
        console.error("DB connection failed, error:", error)
        process.exit(1)
    }
}

//authRoutes

//authController

//User Model

// middleware isAuth