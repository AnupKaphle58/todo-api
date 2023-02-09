// Utils

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
  const { type, message, statusCode, user } = await authService.signin(
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
  return (
    res
      // .cookie("access_token", tokens.accessToken, {
      //   httpOnly: true,
      //   secure: false,
      //   path: "/",
      //   maxAge: 24 * 60 * 60 * 1000,
      //   sameSite: false,
      // })
      .status(statusCode)
      .json({
        type,
        message: message,
        user,
      })
  );
};
