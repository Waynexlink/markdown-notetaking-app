const express = require("express");
const dbConnect = require("./config/db");
const authRoute = require("./routes/userRoute");
const uploadRoute = require("./routes/uploadRoute");
const AppError = require("./middleware/errorHandler");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();

//startup database
dbConnect();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Homepage");
});

// Register routes
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);

// Handle other unregistered routes (this should be placed at the end)
// app.use("*", (req, res, next) => {
//   res.status(404).json({ status: "error", message: "Resources not found" });
// });

// Global error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is listening ");
});
