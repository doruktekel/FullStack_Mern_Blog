import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";
import verifyUser from "../middlewares/verifyMiddleware.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get("/:postId", getComments);

export default router;
