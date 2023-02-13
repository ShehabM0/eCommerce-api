const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${file.mimetype.substring(6)}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 2 * 1024  * 1024 // 2,097,152 Bytes <=> 2 mb
    },
    fileFilter(req, file, cb) {
        const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
        if (allowedTypes.includes(file.mimetype)) {
            return cb(undefined, true)
        }
        cb(new Error("File must be an image of type jpg, jpeg or png!"));
    }
}).single('image');

module.exports = upload;