const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    return next(new AppError("Invalid token", 401));

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return next(new AppError("Token expired, please log in again", 401));
    }
    return next(new AppError("Invalid token, please log in again", 401));
  }
};
