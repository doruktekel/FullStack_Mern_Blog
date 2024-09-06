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

const getPosts = async (req, res, next) => {
  try {
    const startIndex = +req.query.startIndex || 0;
    const limit = +req.query.limit || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await PostModel.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { postId: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    if (posts.length === 0) {
      return next(errorHandler(404, "Could not find posts"));
    }

    const totalPosts = await PostModel.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await PostModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export { createPost, getPosts };
