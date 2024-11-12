import errorHandler from "../middlewares/errorMiddleware.js";
import { CommentModel } from "../models/commentModel.js";

export const createComment = async (req, res, next) => {
  const { content, postId, userId } = req.body;

  try {
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allow to create this comment")
      );
    }

    const createdComment = await CommentModel.create({
      content,
      userId,
      postId,
    });

    res.status(201).json(createdComment);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    return next(errorHandler(404, "Post is not find"));
  }

  try {
    const comments = await CommentModel.find({ postId })
      .populate("userId")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { id: userId } = req.user;

  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    const isLiked = comment.likes.includes(userId);

    let updatedComment;

    if (isLiked) {
      updatedComment = await CommentModel.findOneAndUpdate(
        { _id: commentId },
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      updatedComment = await CommentModel.findOneAndUpdate(
        { _id: commentId },
        { $addToSet: { likes: userId } },
        { new: true }
      );
    }

    res.status(200).json({ likes: updatedComment.likes.length });
  } catch (error) {
    next(error);
  }
};
