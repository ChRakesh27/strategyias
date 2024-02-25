import multer from "multer";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "_" + Date.now + path.extname(file.originalname));
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");

