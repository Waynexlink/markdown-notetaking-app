const express = require("express");
const upload = require("../middleware/fileupload");
const {
  fileUploader,
  getUploadedFiles,
} = require("../controller/fileController");

const Router = express.Router();

Router.post("/", upload.single("file"), fileUploader);
Router.get("/", getUploadedFiles);

module.exports = Router;
