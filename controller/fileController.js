const File = require("../models/fileModel");
const path = require("path");
const AppError = require("../utils/AppError");
const fs = require("fs").promises;
const marked = require("marked");
const axios = require("axios");
const fileUploader = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) return next(new AppError("No file has been uploaded,", 404));

    await File.create({
      filename: file.filename,
      fileType: path.extname(file.originalname),
    });
    res.status(201).json({
      status: "success",
      message: "file uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getUploadedFiles = async (req, res, next) => {
  try {
    const files = await File.find();
    if (!files || files.length === 0)
      return next(new AppError("no file uploaded", 404));

    res.status(200).json({
      status: "success",
      message: "Successfully retrived all files",
      data: {
        files,
      },
    });
  } catch (error) {
    next(error);
  }
};

const renderFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) return next(new AppError("No files found", 404));

    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      file.filename
    );

    const data = await fs.readFile(filePath, "utf-8");

    const htmlContent = marked.parse(data);

    res.status(200).json({
      status: "success",
      message: " File rendered Successfully",
      data: htmlContent,
    });
  } catch (error) {
    next(error);
  }
};
const grammerCheck = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) return next(new AppError("No files found", 404));

    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      file.filename
    );

    const data = await fs.readFile(filePath, "utf-8");

    const resData = await axios({
      method: "POST",
      url: "https://api.languagetool.org/v2/check",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        text: data,
        language: "en-US",
      }),
    });

    res.status(200).json({
      status: "success",
      message: " Grammer check successful",
      issues: resData.data.matches,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const file = await File.findById(id);
    if (!file) return next(new AppError("File does not exist"));

    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      file.filename
    );
    await fs.promises.unlink(filePath).catch((err) => {
      console.log("file deletion error", err);
    });

    await File.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  fileUploader,
  getUploadedFiles,
  renderFile,
  grammerCheck,
  deleteFile,
};
