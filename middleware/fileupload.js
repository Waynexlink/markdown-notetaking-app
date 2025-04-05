const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [".md", ".txt"]; // Only allow markdown/text files
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowed.includes(ext)) {
    return cb(new Error("Only .md and .txt files allowed"), false);
  }
  cb(null, true);
};

// Update your multer config:
const upload = multer({
  storage,
  fileFilter, // Add this line
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});
module.exports = upload;
