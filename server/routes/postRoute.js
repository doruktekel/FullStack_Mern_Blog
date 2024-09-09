import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
import verifyUser from "../middlewares/verifyMiddleware.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getposts", getPosts);
router.delete("/delete/:postId/:userId", verifyUser, deletePost);
router.put("/update/:postId/:userId", verifyUser, updatePost);

export default router;
