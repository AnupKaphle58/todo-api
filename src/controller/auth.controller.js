// Services
import { authService } from "../services/index.js";

export const signup = async (req, res) => {
  // 1) Calling sign up service
  const { type, message, statusCode, user, tokens } = await authService.signup(
    req.body
  );

  // 2) Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message: message,
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: message,
    user,
    tokens,
  });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  // 1) Calling sign in service
  const { type, message, statusCode, user, tokens } = await authService.signin(
    email,
    password
  );

  // 2) Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message: message,
    });
  }
  // 3) If everything is OK, send data
  return res
    .cookie("token", tokens, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 60 * 1000 * 5,
      sameSite: false,
    })
    .status(statusCode)
    .json({
      type,
      message: message,
      user,
    });
};

export const logout = (req, res) => {
  return res.clearCookie("token").status(200).json({
    type: "success",
    message: "You have been logged out successfully.",
  });
};
