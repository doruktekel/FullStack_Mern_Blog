import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import verifyUser from "../middlewares/verifyMiddleware.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getposts", getPosts);

export default router;
