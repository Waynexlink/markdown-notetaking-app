const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //check if the user is existing
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser)
      return next(new AppError(`User already exist please login`, 401));

    const newUser = User.create({ name, email, password });
    res.status(201).json({
      status: 201,
      message: "User sucessfully created",
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if email exist in database
    const user = await User.findOne({ email });
    if (!user) return next(new Error("Invalid email or password"));
    //see if password match by comparing to bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return next(new Error("Invalid email or password"));
    //and since it match make jwt token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      status: 201,
      message: "Login Succesfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, registerUser };
