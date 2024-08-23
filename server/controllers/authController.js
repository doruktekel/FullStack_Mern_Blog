import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { hashPassword } from "../helpers/authHelpers.js";
import errorHandler from "../middlewares/errorMiddleware.js";
import UserModel from "../models/userModel.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(345, "Fill all the blankets !"));
  }

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json("Created was successfully");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "Fill the all fields !"));
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(errorHandler(404, "User not found !"));
  }

  const validPassword = await bcryptjs.compare(password, user.password);

  if (!validPassword) {
    return next(errorHandler(400, "Credentials are wrong !"));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  const { password: _, ...rest } = user._doc;

  res
    .cookie("access_token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(rest);
};

export { signup, signin };
