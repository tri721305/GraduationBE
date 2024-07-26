import path from "path";
import multer from "multer";
import fs from "fs";

const checkFileType = (file, cb) => {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  console.log("file", file);
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimeType);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images only !!!");
  }
};

export const uploadMultiple = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image", 12);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000,
  },
  fileFilter: function (req, file, cb) {
    console.log("file", file, cb);
    checkFileType(file, cb);
  },
}).single("image");
