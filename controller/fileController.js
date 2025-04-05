const File = require("../models/fileModel");
const path = require("path");
const AppError = require("../utils/AppError");
const fileUploader = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) return next(new AppError("no file has been uploaded,", 404));

    await File.create({
      filename: file.originalname,
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

getUploadedFiles = async (req, res, next) => {
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
module.exports = { fileUploader, getUploadedFiles };
