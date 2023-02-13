const formUpload = require('../helper/formUpload');
const Painting = require('../models/Painting');
const multer = require('multer');

const createPainting = (req, res) => {
    /*
        form-input-fields contains Uploaded image file and other
        Painiting informations, the image validated by multer and the other
        Painiting informations validated by Painiting schema.
    */
    formUpload (req, res, async (err) => 
    {
        // handling image errors.
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).send({ status: "error", message: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).send({ status: "error", message: err.message });
        }
        // handling painting errors and creating it.
        try {
            if(!req.file)
                return res.status(404).send({ status: "error", message: "Please provide image"});
            req.body.image = req.file.path;
            const painting = await Painting.create(req.body);
            res.status(200).send({ status: "ok",  message: painting });
        } catch (error) {
            const err = error.message;
            res.status(500).send({ status: "error", message: err });
        }
    });
}

const getPainting = async (req, res) => {
    let statusCode, messageText;
    const painting_id = req.params.id;
    try {
        const painting = await Painting.findById(painting_id);
        statusCode = 200;
        messageText = painting;
        if(!painting) {
            statusCode = 400;
            messageText = "The painting you are looking for doesn't exist!";
        }
        res.status(statusCode).send({ status: "ok", message: messageText });    
    } catch (error) {
        const err = error.message;
        res.status(500).send({ status: "error", message: err });
    }
}

const getAllPainting = async (req, res) => {
    try {
        const paintings = await Painting.find();
        res.status(200).send({ status: "ok", message: paintings, count: paintings.length });
    } catch (error) {
        const err = error.message;
        res.status(500).sned({ status: "error", message: err });
    }
}

module.exports = {
    createPainting,
    getAllPainting,
    getPainting
};