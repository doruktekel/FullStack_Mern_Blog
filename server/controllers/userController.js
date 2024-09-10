import errorHandler from "../middlewares/errorMiddleware.js";
import bcryptjs from "bcryptjs";
import UserModel from "../models/userModel.js";

const update = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You cant update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be min 6 characters"));
    }
    req.body.password = await bcryptjs.hash(req.body.password, 12);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
        },
      },
      {
        new: true,
      }
    );

    const { password: _, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You can just delete own user account"));
  }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You can just delete own user account"));
  }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Not allow to getting users !"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await UserModel.find({
      _id: {
        $ne: req.user.id,
      },
    })
      .select("-password")
      .sort({ createdAt: sortDirection })
      .limit(limit)
      .skip(startIndex);

    // const usersWithoutPassword = users.map((user) => {
    //   const { password: _, ...rest } = user._doc;
    //   return rest;
    // });

    const totalUsers = await UserModel.countDocuments();

    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const lastMonthUsers = await UserModel.countDocuments({
      createdAt: {
        $gte: oneMonthAgo,
      },
    });

    res.status(200).json({
      users,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export { update, deleteUser, getUsers, deleteUsers };
