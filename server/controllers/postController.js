import errorHandler from "../middlewares/errorMiddleware.js";
import PostModel from "../models/postModel.js";

const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Just admins can create posts"));
  }

  if (!req.body.title || !req.body.title) {
    return next(errorHandler(400, "Please fill all requirements"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  try {
    const newPost = await PostModel.create({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};

export { createPost };
