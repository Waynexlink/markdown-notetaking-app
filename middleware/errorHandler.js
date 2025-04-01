const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  console.log("ERROR:", err);

  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler