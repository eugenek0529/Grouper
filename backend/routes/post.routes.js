import express from "express";
import { createPost, getPosts, applyToPost, 
    updatePost, deletePost,
    acceptApplicant, declineApplicant
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createPost", createPost);
router.get("/getPosts", getPosts);

// hanle apply (edit post)
router.post("/:postId/apply", applyToPost)

// handle edit post as creator
router.put("/:postId", updatePost)

// delete post as user
router.delete("/:postId", deletePost);

// handle accept or decline
router.post('/:postId/applicants/:applicantId/accept', acceptApplicant);
router.post('/:postId/applicants/:applicantId/decline', declineApplicant);
export default router;
