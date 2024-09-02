import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = async (pass) => {
  try {
    return await bcryptjs.hash(pass, 12);
  } catch (error) {
    console.log(error);
  }
};

const generateToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
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

export { hashPassword, generateToken };
