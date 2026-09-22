import {Router} from "express";
import { registerUser, loginUser,logoutUser ,getMe} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const authRoutes=Router();

authRoutes.post("/register",registerUser);
authRoutes.post("/login",loginUser);
authRoutes.post("/logout",logoutUser);
authRoutes.get("/getme",authMiddleware,getMe)

export default authRoutes