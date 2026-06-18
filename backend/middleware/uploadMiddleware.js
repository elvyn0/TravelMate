const multer = require("multer");

const storage = multer.memoryStorage();

// Allowing only pdf and image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jgp", "image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF,JPG and PNG files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = upload;
