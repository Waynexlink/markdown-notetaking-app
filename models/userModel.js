const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

user.pre("save", async function (next) {
  try {
    //check if password has been modified
    if (!this.isModified("password")) return next();

    //generate salt and hash password
    const salt = bcrypt.genSalt(10);

    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userShema);

module.exports = User;
