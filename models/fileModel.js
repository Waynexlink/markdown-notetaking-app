const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: {
      required: true,
      type: String,
    },
    fileType: {
      required: true,
      type: String,
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
