const express = require("express");
const dbConnect = require("./config/db");
const authRoute = require("./routes/userRoute");
const AppError = require("./middleware/errorHandler");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();

//startup database
dbConnect();

app.get("/", (req, res) => {
  res.send("Homepage");
});

//register routes
app.use("/api/auth", authRoute);
//handle other unregistered routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is listening ");
});
