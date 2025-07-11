// middleware/upload.js
import multer from 'multer';
import path from 'path';

// 🔒 Set storage location and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// 🧾 File filter (optional - only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;