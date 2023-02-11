// Utils
import AppError from "../utils/appError.js";

//Middleware
import { verifyToken } from "./token.js";

const protect = async (req, res, next) => {
  // 1) Getting the token
  const token = req.cookies?.token;

  // 2) Check if token does not exist
  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }

  // 3) Token verification
  const decoded = verifyToken(token);

  req.user = decoded;

  next();
};

export default protect;
