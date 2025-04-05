const express = require("express");
const upload = require("../middleware/fileupload");
const {
  fileUploader,
  getUploadedFiles,
  renderFile,
  grammerCheck,
  deleteFile,
} = require("../controller/fileController");

const Router = express.Router();

Router.post("/", upload.single("file"), fileUploader);
Router.get("/", getUploadedFiles);
Router.get("/:id/render", renderFile);
Router.get("/:id/grammer_check", grammerCheck);
Router.delete("/:id", deleteFile);

module.exports = Router;
