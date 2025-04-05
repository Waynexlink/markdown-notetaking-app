const { body, validationResult } = require("express-validator");

const validateUser = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

const handleValidationError = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

  next();
};

module.exports = { validateUser, handleValidationError };
