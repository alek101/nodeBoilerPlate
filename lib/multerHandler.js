const multer = require('multer');
const error = require('../middlewares/errorHandling/errorConstants');

const storage = multer.memoryStorage({
  destination(req, file, cb) {
    cb(null, '');
  },
});

// below variable is define to check the type of file which is uploaded

const filefilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(error.BAD_REQUEST, false);
  }
};

const upload = multer({ storage, fileFilter: filefilter, limits: { fileSize: 12000000 } });

module.exports.multerHandler = (file) => upload.single(file);
