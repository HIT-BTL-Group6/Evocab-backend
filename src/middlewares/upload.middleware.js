const multer = require('multer');
const path = require('path');

const uploadDirectory = 'uploads/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dest = '';
        if (file.fieldname === 'image') {
            dest = path.join(uploadDirectory, 'image');
        } else if (file.fieldname === 'sound') {
            dest = path.join(uploadDirectory, 'sound');
        } else if (file.fieldname === 'avatar') {
            dest = path.join(uploadDirectory, 'avatar');
        }
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop();
        const fileName = file.originalname.replace(`.${extension}`, '');
        const finalFileName = fileName + '.' + extension;
        cb(null, finalFileName);
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
    } else if (
        file.fieldname === 'avatar' &&
        file.mimetype.startsWith('image/')
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
