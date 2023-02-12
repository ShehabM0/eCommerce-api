const imgUpload = require('../helper/imgUpload');
const multer = require('multer');

const addImage = (req, res) => {
    imgUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).send({ status: "error", message: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).send({ status: "error", message: err.message });
        }
        // no image error for today.
        res.status(200).send({status: "ok", message: req.file });
      });
}

module.exports = addImage;