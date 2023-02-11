// imports
import bcrypt from "bcrypt";

// middleware
import { generateToken } from "../middleware/token.js";

// Models
import { User } from "../models/index.js";

export const signup = async (body) => {
  let { username, email, password } = body;

  // 1) Check all fields
  if (!username || !email || !password) {
    return {
      type: "Error",
      message: "Fields cannot be empty",
      statusCode: 400,
    };
  }

  // 2) Check if password length less than 8
  if (password.length < 8) {
    return {
      type: "Error",
      message: "Password length must be greater than 8",
      statusCode: 400,
    };
  }

  const isEmailTaken = await User.findOne({ email });

  // 3) Check if the email already taken
  if (isEmailTaken) {
    return {
      type: "Error",
      message: "Email address is already taken.",
      statusCode: 409,
    };
  }

  // 4) Encrypt Password Using Bcrypt
  password = await bcrypt.hash(password, 10);

  // 5) Create new user account
  const user = await User.create({
    username,
    email,
    password,
  });

  // 6) Remove the password from the output
  user.password = undefined;

  // 7) If everything is OK, send user data
  return {
    type: "Success",
    statusCode: 201,
    message: "Sign up successful",
    user,
  };
};

export const signin = async (email, password) => {
  // 1) Check if email and password exist
  if (!email || !password) {
    return {
      type: "Error",
      statusCode: 400,
      message: "Fields cannot be empty. Email or password is required",
    };
  }

  // 2) Get user from database
  const user = await User.findOne({ email }).select("+password");
  // 3) Check if user does not exist
  if (!user) {
    return {
      type: "Error",
      statusCode: 401,
      message: "Incorrect Email or Password",
    };
  }
  const isMatch = bcrypt.compareSync(password, user.password);

  // 4) Check if passwords match
  if (!isMatch) {
    return {
      type: "Error",
      statusCode: 401,
      message: "Incorrect Email or Password1",
    };
  }

  // 5) Generate authentication tokens
  const tokens = generateToken(user._id);

  // 6) Remove the password from the output
  user.password = undefined;

  // 7) If everything ok, send data
  return {
    type: "Success",
    statusCode: 200,
    message: "Login Sucessfull",
    user,
    tokens,
  };
};
