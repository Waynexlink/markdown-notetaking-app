const express = require("express");
const { loginUser, registerUser } = require("../controller/userController");
const {
  validateUser,
  handleValidationError,
} = require("../middleware/validateUser");
const router = express.Router(); // Correct router import

// Proper route definitions
router.post("/login", loginUser);
router.post("/register", validateUser, handleValidationError, registerUser);

module.exports = router;
