const multer = require('multer');

const dest = 'uploads/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    },
});

const upload = multer({ storage });

module.exports = upload;
