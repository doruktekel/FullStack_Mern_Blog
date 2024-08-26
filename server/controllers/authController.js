import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken, hashPassword } from "../helpers/authHelpers.js";
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
    return next(errorHandler(400, "Fill all the blankets !"));
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

  generateToken(user, res);
};

const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  const user = await UserModel.findOne({ email });

  try {
    if (user) {
      generateToken(user, res);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatePassword, 12);
      const newUser = await UserModel.create({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      generateToken(newUser, res);
    }
  } catch (error) {
    next(error);
  }
};

export { signup, signin, google };
