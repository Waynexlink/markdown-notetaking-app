const express = require("express");
const { loginUser, registerUser } = require("../controller/userController");
const {
  validateUser,
  handleValidationError,
} = require("../middleware/validateUser");
const router = express.Router();

router.get("/login", validateUser, handleValidationError, loginUser);
router.get("/register", validateUser, handleValidationError, registerUser);

module.exports = router;
