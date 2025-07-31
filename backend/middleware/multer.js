const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (!['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
    return cb(new Error('Only images are allowed'), false);
  }
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
