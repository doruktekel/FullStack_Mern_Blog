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

export { signup };
