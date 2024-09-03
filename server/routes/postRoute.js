import express from "express";
import { createPost } from "../controllers/postController.js";
import verifyUser from "../middlewares/verifyMiddleware.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);

export default router;
