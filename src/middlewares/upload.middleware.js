const multer = require('multer');

const dest = 'uploads/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.fieldname === 'image' &&
        file.mimetype.startsWith('image/')
    ) {
        cb(null, true);
    } else if (
        file.fieldname === 'sound' &&
        (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3')
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
