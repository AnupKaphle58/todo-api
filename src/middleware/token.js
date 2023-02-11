import jwt from "jsonwebtoken";

import config from "../config/config.js";

export const generateToken = (userId, secret = config.jwt.secret) => {
  const options = {
    expiresIn: 60 * 1000 * 5,
  };
  const payload = {
    sub: userId,
    options,
  };
  return jwt.sign(payload, secret);
};

export const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);
  return payload;
};
