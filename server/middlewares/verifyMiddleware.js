import jwt from "jsonwebtoken";
import errorHandler from "./errorMiddleware.js";

const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(403, "Un Authorization - no token"));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decode) {
    return next(errorHandler(403, "Un Authorization - no valid token"));
  }

  req.user = decode;

  next();
};

export default verifyUser;
