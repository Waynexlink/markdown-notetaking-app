const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected ");
  } catch (error) {
    console.log("error connecting to database", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
