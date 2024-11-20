import express from "express";
import { logout, signup, login, verify } from "../controllers/auth.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get('/verify', authenticate, verify)



export default router;