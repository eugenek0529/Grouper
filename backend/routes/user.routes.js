import express from "express"; 
import { registerUser, getUsers } from "../controllers/user.controller.js";
const router = express.Router(); 


router.post("/register", registerUser); 
router.get("/allUsers", getUsers); 

export default router; 
