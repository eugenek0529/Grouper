import express from "express";
import { createTag, getTags } from "../controllers/tags.controller.js";
const router = express.Router();

router.post("/createTag", createTag);
router.get("/getTag", getTags);

export default router;
