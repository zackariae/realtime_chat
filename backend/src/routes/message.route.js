import express from "express";
const router = express.Router();
import {getUsersForSidebar, createMessage, getMessages, sendMessage} from "../controllers/message.controller.js";
import  protectRoute  from "../middleware/auth.middleware.js";

router.get("/users", protectRoute, getUsersForSidebar);

router.post("/", createMessage);
router.get("/:id",protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;