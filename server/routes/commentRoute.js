import express from "express";
import {
  createComment,
  getComments,
  likeComment,
} from "../controllers/commentController.js";
import verifyUser from "../middlewares/verifyMiddleware.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get("/:postId", getComments);
router.put("/comment-like/:commentId", verifyUser, likeComment);

export default router;
